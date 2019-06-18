var express = require('express')
var router = express.Router()
var model = require('../models').News
var modelComment = require('../models').Comment
var slug = require('slug')
var checkUserLogged = require('../utils/checkUserLogged')
var activity = require('../models').Activity
router
  // Get all News
  .get('/', (req, res) => {
    var category = req.query.category ? req.query.category : ''
    var verify = req.query.verify ? req.query.verify : ''
    let where = {}
    if (category) {
      where.category = category
    }
    if (verify) {
      where.state = -1
    } else {
      where.state = 1
    }
    model.findAndCountAll({
      where: where
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        var oderBy = req.query.orderBy ? req.query.orderBy : 'createdAt'
        model.findAll({
          where: where,
          order: [
            [oderBy, 'DESC'],
          ],
          limit: limit,
          offset: offset,
        })
          .then((news) => {
            res.status(200).json({'result': news, oderBy, 'count': data.count, 'pages': totalPages, 'currentPage': currentPage});
          })
      })
      .catch(err => res.json(err))
  })
  .get('/comment/:id', (req, res) => {
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
        modelComment.findAll({
          include: ['user'],
          where: {
            itemId: req.params.id,
            type: 2
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
        data.update({
          hits: data.hits + 1
        })
        res.json(data)
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
      // save activity
      activity.create({
        createdBy: req.decoded.data.id,
        type: 1,
        typeItem: 2,
        itemId: data.id,
        note: JSON.stringify(data)
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
