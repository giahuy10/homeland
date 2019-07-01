var express = require('express')
var router = express.Router()
var model = require('../models').Property
var modelComment = require('../models').Comment
var modelMedia = require('../models').PropertyMedia
var slug = require('slug')
var checkUserLogged = require('../utils/checkUserLogged')
var sendMail = require('../utils/sendMail')
var activity = require('../models').Activity
var sequelize = require('../models').sequelize
var cache = require('express-redis-cache')()


router
  .post('/sendmail' , (req, res) => {
    let htmlEmail = "<h3>Huy day nay</h3>"
    let email = sendMail('anjakahuy@gmail.com', 'Người dùng vừa gửi thông tin dự án mới nhes Huy', '', htmlEmail)
    res.json(email)
  })
  // Get all Properties
  .get('/', (req, res) => {

    var city = req.query.city ? parseInt(req.query.city) : 0
    var proType = req.query.proType ? parseInt(req.query.proType) : 0
    var district = req.query.district ? parseInt(req.query.district) : 0
    var type = req.query.type ? parseInt(req.query.type) : 0
    var price = req.query.price ? parseInt(req.query.price) : 0
    var oderBy = req.query.sortBy ? req.query.sortBy : 'id'
    var verify = req.query.verify ? req.query.verify : ''
    var title = req.query.title ? req.query.title : ''

    var userId = req.query.userId ? parseInt(req.query.userId) : 0
    let cacheName = proType ? 'Other' : 'Featured'
    let where = {}
    let whereRaw = "WHERE 1"
    if (city) {
      where.city = city
      whereRaw += " and city = "+city
    }
    if (district) {
      where.district = district
      whereRaw += " and district = "+district
    }
    if (type) {
      where.type = type
      whereRaw += " and p.type = "+type
    }
    if (price) {
      where.price = price
      whereRaw += " and price = "+price
    }
    if (title) {
      where.search = {
         $like: '%'+title+'%'

      }
      whereRaw += " and search like '%"+title+"%'"
    }
    let cacheable = false
    if (Object.keys(where).length === 0 && where.constructor === Object) {
      cacheable = true
    }
    if (verify) {
      where.state = -1
      whereRaw += " and state = -1"
    } else {
      where.state = 1
      whereRaw += " and state = 1"
    }

    model.findAndCountAll({
      where: where
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)

        sequelize.query("SELECT p.*, s.id as `like` FROM `Properties` as p LEFT JOIN `Saveds` as s ON p.id = s.itemId and s.type = 3 and s.createdBy = "+userId+" "+whereRaw+ " GROUP by p.id ORDER BY "+oderBy+" DESC LIMIT "+offset+", "+limit, { type: sequelize.QueryTypes.SELECT})
          .then((news) => {
            let response = {'result': news, 'count': data.count, 'pages': totalPages, 'currentPage': currentPage}
            res.status(200).json(response);
          })
          .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
    
  })

  .get('/check-pro', (req, res) => {
    let offset = 0
    let limit = 10
    let userId = req.decoded ? req.decoded.data.id : 0
     sequelize.query("SELECT p.*, s.id as `like` FROM `Properties` as p LEFT JOIN `Saveds` as s ON p.id = s.itemId and s.type = 3 and s.createdBy = "+userId+" GROUP by p.id LIMIT "+offset+", "+limit, { type: sequelize.QueryTypes.SELECT})
        .then(pros => {
          // We don't need spread here, since only the results will be returned for select queries
          res.status(200).json({'result': pros });
        })
        .catch(err => res.json(err))
  })

  // Check property right
  .post('/check/:id', checkUserLogged, (req, res) => {

    model.findByPk(req.params.id)
    .then(data => {
      if (data.createdBy == req.decoded.data.id) {
        res.json(data)
      } else {
        res.status(401).json({ msg: 'not'})
      }
    })
    .catch(err => res.json({err: err}))
  })

  .get('/comment/:id', (req, res) => {
    var userId = req.query.userId ? parseInt(req.query.userId) : 0
    modelComment.findAndCountAll({
      where: {
        itemId: req.params.id,
        type: 1
      }
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 100
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)

        sequelize.query("SELECT c.*, s.id as `like`, u.id as userId, firstName, lastName, avatar FROM `Comments` as c LEFT JOIN `Saveds` as s ON c.id = s.itemId and s.type = 1 and s.createdBy = "+userId+" INNER JOIN `Users` as u ON u.id = c.createdBy where c.type = 1 and c.itemId = "+req.params.id+" GROUP by c.id ORDER BY parent ASC, createdAt ASC LIMIT " + offset + ", "+limit, { type: sequelize.QueryTypes.SELECT})
          .then((comments) => {
            let items = {}
            let parents = {}
            if (comments && comments.length > 0) {
              comments.forEach(item => {
                items[item.id] = item
                if (!parents[item.parent]) {
                  parents[item.parent] = []
                }
                parents[item.parent].push(item.id)
              })
            }
            var final = []
            if (parents) {
              if (parents[0] && parents[0].length > 0) {
              parents[0].forEach(item => {
              final.push(items[item])
              if (parents[item]) {
                parents[item].forEach(item => {
                  final.push(items[item])
                })
              }
              })
              }
            }
            res.status(200).json({'result': final, 'count': data.count, 'pages': totalPages, 'currentPage': currentPage});
          })
      })
      .catch(err => res.json(err))
  })

  // Get detail property by ID
  .get('/:id', (req, res) => {
    model.findOne({
      include: [
        {
          model: modelMedia,
          as: 'images'
        }
      ],
      where: {
        $or: [
          {
            id: req.params.id
          },
          {
            slug: {
              $like: '%'+req.params.id+'%'
            }
          },
        ]
      }
    })
      .then(data => {
        if (data) {
          data.update({
            hits: data.hits + 1
          }).then(update => console.log(update)).catch(err => res.json({err: err}))
          // comments
          var userId = req.query.userId ? parseInt(req.query.userId) : 0
          modelComment.findAndCountAll({
            where: {
              itemId: data.id,
              type: 1
            }
          })
            .then(commentData => {
              var limit = req.query.perPage ? parseInt(req.query.perPage) : 100
              var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
              var totalPages = Math.ceil(commentData.count / limit)
              var offset = limit * (currentPage - 1)

              sequelize.query("SELECT c.*, s.id as `like`, u.id as userId, firstName, lastName, avatar FROM `Comments` as c LEFT JOIN `Saveds` as s ON c.id = s.itemId and s.type = 1 and s.createdBy = "+userId+" INNER JOIN `Users` as u ON u.id = c.createdBy where c.type = 1 and c.itemId = "+req.params.id+" GROUP by c.id ORDER BY parent ASC, createdAt ASC LIMIT " + offset + ", "+limit, { type: sequelize.QueryTypes.SELECT})
                .then((comments) => {
                  let items = {}
                  let parents = {}
                  if (comments && comments.length > 0) {
                    comments.forEach(item => {
                      items[item.id] = item
                      if (!parents[item.parent]) {
                        parents[item.parent] = []
                      }
                      parents[item.parent].push(item.id)
                    })
                  }
                  var final = []
                  if (parents) {
                    if (parents[0] && parents[0].length > 0) {
                    parents[0].forEach(item => {
                    final.push(items[item])
                    if (parents[item]) {
                      parents[item].forEach(item => {
                        final.push(items[item])
                      })
                    }
                    })
                    }
                  }
                  
                  res.json({
                    data,
                    comments: {'result': final, 'count': commentData.count, 'pages': totalPages, 'currentPage': currentPage}
                  })
                 
                })
            })
            .catch(err => console.log(err))

            // comments
            
          
          
        } else {
          res.status(404).json({msg: 'Không tìm thấy dự án'})
        }

      })
      .catch(err => res.json(err))
  })

  // Insert property
  .post('/', checkUserLogged, (req, res) => {
    req.body.slug = slug(req.body.title)
    req.body.createdBy = req.decoded.data.id

    model.create(req.body)
      .then(data => {
        if (req.decoded.data.level == 1) {
          let htmlEmail = ''
          htmlEmail += '<h4>Xin chào admin</h4>'
          htmlEmail += `<p>Dự án <a href="http://homenland.vn/property/detail/${data.slug}">"${data.title}"</a> vừa được gửi lên hệ thống. Vui lòng kiểm tra để phê duyệt dự án</p>`
          sendMail('info@homenland.vn', 'Người dùng vừa gửi thông tin dự án mới', '', htmlEmail)
        }
          // save activity
          activity.create({
            createdBy: req.decoded.data.id,
            type: 1,
            typeItem: 3,
            itemId: data.id,
            note: data.title,
            url: `/property/detai/${data.id}`
          }).then(response => console.log('Done')).catch(err => console.log(err))
          let bulkData = []
          if (req.body.images && req.body.images.length > 0) {

            req.body.images.forEach(item => {
              bulkData.push({
                createdBy: req.decoded.data.id,
                proId: data.id,
                source: item.source,
                thumbnail: item.thumbnail,
                height: item.height,
                width: item.width,
                type: item.type
              })

            })

            modelMedia.bulkCreate(bulkData)
              .then(response => console.log(response))
              .catch(err => console.log.json(err))
          }
    
        res.json(data)
      })
      .catch(err => res.status(500).json(err))
  })

  // Update property
  .put('/:id', checkUserLogged, (req, res) => {
    model.update(
        req.body,
        { where: {id: req.params.id} }
      ).then(() => {
        

        res.status(200).send("updated successfully with id = " + req.params.id);
      }).catch(err => res.json(err))
  })

  // Delete property
  .delete('/:id', checkUserLogged, (req, res) => {
    model.destroy({
      where: { id: req.params.id }
    }).then(() => {
     
      res.status(200).send('deleted successfully with id = ' + id);
    }).catch(err => res.json(err))
  })

module.exports = router;
