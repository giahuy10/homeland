var express = require('express')
var router = express.Router()
var model = require('../models').Comment
var property = require('../models').Property
var activity = require('../models').Activity
var checkUserLogged = require('../utils/checkUserLogged')
var modelMedia = require('../models').PropertyMedia

router
  // Get all News
  .get('/', (req, res) => {
    // model.findAll().then(data => res.json(data)).catch(err => res.json(err))
    model.findAndCountAll({
      where: {
        type: 1,
        parent: 0
      }
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        model.findAll({
          include: ['user', 'property'],
          where: {
            type: 1,
            parent: 0
          },
          limit: limit,
          offset: offset,
        })
          .then((news) => {
            res.status(200).json({'result': news, 'count': data.count, 'pages': totalPages, 'currentPage': currentPage});
          })
      })
      .catch(err => res.json(err))
  })

  // Get detail News by ID
  .get('/:id', (req, res) => {
    model.findByPk(req.params.id)
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
    req.body.createdBy = req.decoded.data.id
    req.body.state = 1
    req.body.images = JSON.stringify(req.body.images)
    let images = req.body.images
    let totalWidth = 0
    // save activity
    activity.create({
      createdBy: req.decoded.data.id,
      type: 1,
      typeItem: 1,
      itemId: req.body.itemId,
      note: req.body.text
    }).then(response => console.log(response)).catch(err => console.log(err))

    property.findByPk(req.body.itemId)
      .then(data => {
        data.update({
            totalComments: data.totalComments + 1,

          }).then(response => console.log(response))
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    model.create(req.body).then(data => {
      let bulkData = []
        if (images && images.length > 0) {

          images.forEach(item => {
            bulkData.push({
              createdBy: req.decoded.data.id,
              proId: data.id,
              source: item.source,
              thumbnail: item.thumbnail,
              height: item.height,
              width: item.width,
              type: 3
            })
            totalWidth += item.width
          })
          data.update({
            totalWidth: totalWidth
          }).then(response => console.log(response))
            .catch(err => console.log.json(err))
          modelMedia.bulkCreate(bulkData)
            .then(response => console.log(response))
            .catch(err => console.log(err))
        }
        res.json(data)
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
