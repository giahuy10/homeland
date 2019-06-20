var express = require('express')
var router = express.Router()
var model = require('../models').News
var modelComment = require('../models').Comment
var slug = require('slug')
var checkUserLogged = require('../utils/checkUserLogged')
var activity = require('../models').Activity
var sequelize = require('../models').sequelize
var sendMail = require('../utils/sendMail')
router
  // Get all News
  .get('/', (req, res) => {
    var category = req.query.category ? req.query.category : ''
    var verify = req.query.verify ? req.query.verify : ''
    let where = {}
    let whereRaw = "WHERE 1"
    if (category) {
      where.category = category
      whereRaw += " and category ='"+category+"'"
    }
    if (verify) {
      where.state = -1
      whereRaw += " and state = -1"
    } else {
      where.state = 1
      whereRaw += " and state = 1"
    }
    var userId = req.query.userId ? parseInt(req.query.userId) : 0
    model.findAndCountAll({
      where: where
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        var oderBy = req.query.orderBy ? req.query.orderBy : 'createdAt'
        // model.findAll({
        //   where: where,
        //   order: [
        //     [oderBy, 'DESC'],
        //   ],
        //   limit: limit,
        //   offset: offset,
        // })
        sequelize.query("SELECT n.*, s.id as `like` FROM `news` as n LEFT JOIN `saveds` as s ON n.id = s.itemId and s.type = 2 and s.createdBy = "+userId+" "+whereRaw+ " GROUP by n.id ORDER BY "+oderBy+" DESC LIMIT "+offset+", "+limit, { type: sequelize.QueryTypes.SELECT})
          .then((news) => {
            res.status(200).json({'result': news, oderBy, 'count': data.count, 'pages': totalPages, 'currentPage': currentPage});
          })
          .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
  })
  .get('/comment/:id', (req, res) => {
    var userId = req.query.userId ? parseInt(req.query.userId) : 0
    modelComment.findAndCountAll({
      where: {
        itemId: req.params.id,
        type: 2
      }
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 100
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        // modelComment.findAll({
        //   include: ['user'],
        //   where: {
        //     itemId: req.params.id,
        //     type: 2
        //   },
        //   limit: limit,
        //   offset: offset,
        //   order: [
        //     ['parent', 'ASC'],
        //     ['createdAt', 'ASC']
        //   ]
        // })
        sequelize.query("SELECT c.*, s.id as `like`, u.id as userId, firstName, lastName, avatar FROM `comments` as c LEFT JOIN `saveds` as s ON c.id = s.itemId and s.type = 1 and s.createdBy = "+userId+" INNER JOIN `users` as u ON u.id = c.createdBy where c.type = 2 and c.itemId = "+req.params.id+" GROUP by c.id ORDER BY parent ASC, createdAt ASC LIMIT " + offset + ", "+limit, { type: sequelize.QueryTypes.SELECT})
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
          .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
  })
  // Get detail News by ID
  .get('/:id', (req, res) => {
    model.findOne({
      where: {
        $or: [
          {
            id: req.params.id
          },
          {
            slug: req.params.id
          },
        ]
      }
    })
      .then(data => {
        if (data) {
          data.update({
            hits: data.hits + 1
          })
          res.json(data)
        } else {
          res.status(404).json({msg: 'Không tìm thấy bài viết'})
        }

      })
      .catch(err => res.json(err))
  })

  // Insert News
  .post('/', checkUserLogged, (req, res) => {
    req.body.slug = slug(req.body.title)
    req.body.createdBy = req.decoded.data.id
    // req.body.state = req.decoded.data.level > 1 ? 1 : -1
    req.body.hits = 0
    req.body.saved = 0

    model.create(req.body).then(data => {
      if (req.decoded.data.level == 1) {
        let htmlEmail = ''
        htmlEmail += '<h4>Xin chào admin</h4>'
        htmlEmail += `<p>Bài viết <a href="http://homenland.vn/news/detail/${data.slug}">"${data.title}"</a> vừa được gửi lên hệ thống. Vui lòng kiểm tra để phê duyệt dự án</p>`
        sendMail('info@homenland.vn', 'Người dùng vừa gửi thông tin dự án mới', '', htmlEmail)
      }
      // save activity
      activity.create({
        createdBy: req.decoded.data.id,
        type: 1,
        typeItem: 2,
        itemId: data.id,
        note: data.title
      }).then(response => console.log(response)).catch(err => console.log(err))
    res.send(data)
    }).catch(err => res.status(500).json(err))
  })

  // Update News
  .put('/:id', (req, res) => {
    model.update(
        req.body,
        { where: {id: req.params.id} }
      ).then(() => {
        res.status(200).send("updated successfully with id = " + req.params.id);
      }).catch(err => res.json(err))
  })

  // Delete News
  .delete('/:id', (req, res) => {
    model.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.status(200).send('deleted successfully with id = ' + id);
    }).catch(err => res.json(err))
  })

module.exports = router;
