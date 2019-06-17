var express = require('express')
var router = express.Router()
var model = require('../models').News
var slug = require('slug')
var checkUserLogged = require('../utils/checkUserLogged')
var activity = require('../models').Activity
router
  // Get all News
  .get('/', (req, res) => {
    var category = req.query.category ? req.query.category : ''
    let where = {}
    if (category) {
      where.category = category
    }
    model.findAndCountAll()
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        var oderBy = req.query.orderBy ? req.query.orderBy : 'createdAt'
        model.findAll({
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
    req.body.state = 1
    req.body.hits = 0
    req.body.saved = 0
    model.create(req.body).then(data => res.send(data)).catch(err => res.status(500).json(err))
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
