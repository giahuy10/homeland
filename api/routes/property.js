var express = require('express')
var router = express.Router()
var model = require('../models').Property
var modelComment = require('../models').Comment
var modelMedia = require('../models').PropertyMedia
var slug = require('slug')
var checkUserLogged = require('../utils/checkUserLogged')

function buildList (parentId, items, parents, html) {

  if (parents[parentId]) {
    parents[parentId].forEach(itemId => {
      html.push(items[itemId])
      buildList(itemId, items, parents, html)
    })
  }
  return html
}

router
  // Get all Properties
  .get('/', (req, res) => {
    // model.findAll().then(data => res.json(data)).catch(err => res.json(err))
    model.findAndCountAll()
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        model.findAll({
          limit: limit,
          offset: offset,
        })
          .then((news) => {
            res.status(200).json({'result': news, 'count': data.count, 'pages': totalPages, 'currentPage': currentPage});
          })
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
    modelComment.findAndCountAll({
      where: {
        itemId: req.params.id,
        type: 1
      }
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        modelComment.findAll({
          include: ['user'],
          where: {
            itemId: req.params.id,
            type: 1
          },
          limit: limit,
          offset: offset,
          order: [
            ['parent', 'ASC'],
            ['createdAt', 'ASC']
          ]
        })
          .then((comments) => {
            let items = {}
            let parents = {}
            comments.forEach(item => {
              items[item.id] = item
              if (!parents[item.parent]) {
                parents[item.parent] = []
              }
              parents[item.parent].push(item.id)
            })
            var final = []
            parents[0].forEach(item => {
              final.push(items[item])
              if (parents[item]) {
                parents[item].forEach(item => {
                  final.push(items[item])
                })
              }
            })

            res.status(200).json({'result': final, 'count': data.count, 'pages': totalPages, 'currentPage': currentPage});
          })
      })
      .catch(err => res.json(err))
  })

  // Get detail property by ID
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
        data.update({
          hits: data.hits + 1
        }).then(update => console.log(update)).catch(err => res.json({err: err}))
        res.json(data)
      })
      .catch(err => res.json(err))
  })

  // Insert property
  .post('/', checkUserLogged, (req, res) => {
    req.body.slug = slug(req.body.title)
    req.body.createdBy = req.decoded.data.id
    req.body.state = 1
    req.body.hits = 0
    req.body.saved = 0
    req.body.totalImages = 0
    req.body.totalComments = 0
    let images = req.body.images

    delete req.body.images
    model.create(req.body)
      .then(data => {
        let totalWidth = 0
        let totalImages = 0
        let bulkData = []
        if (images && images.length > 0) {

          images.forEach(item => {
            bulkData.push({
              proId: data.id,
              source: item.source,
              thumbnail: item.thumbnail,
              height: item.height,
              width: item.width
            })
            totalWidth += item.width
            totalImages ++;
          })
          data.update({
            totalWidth: totalWidth,
            totalImages: totalImages
          }).then(response => console.log(response))
            .catch(err => res.status(500).json(err))
          modelMedia.bulkCreate(bulkData)
            .then(response => console.log(response))
            .catch(err => res.status(500).json(err))
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
