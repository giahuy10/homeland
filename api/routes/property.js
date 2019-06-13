var express = require('express')
var router = express.Router()
var model = require('../models').Property
var modelMedia = require('../models').PropertyMedia
var slug = require('slug')
var checkUserLogged = require('../utils/checkUserLogged')

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

  // Get detail property by ID
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

  // Insert property
  .post('/', checkUserLogged, (req, res) => {
    req.body.slug = slug(req.body.title)
    req.body.createdBy = req.decoded.data.id
    req.body.state = 1
    req.body.hits = 0
    req.body.saved = 0
    let images = req.body.images

    delete req.body.images
    model.create(req.body)
      .then(data => {
        let bulkData = []
        images.forEach(item => {
          bulkData.push({
            proId: data.id,
            source: item,
            thumbnail: item,
            height: 100,
            width: 80
          })
        });
        modelMedia.bulkCreate(bulkData)
          .then(response => console.log(response))
          .catch(err => res.status(500).json(err))
        res.json(data)
      })
      .catch(err => res.status(500).json(err))
  })

  // Update property
  .put('/:id', (req, res) => {
    model.update(
        req.body,
        { where: {id: req.params.id} }
      ).then(() => {
        res.status(200).send("updated successfully with id = " + req.params.id);
      }).catch(err => res.json(err))
  })

  // Delete property
  .delete('/:id', (req, res) => {
    model.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.status(200).send('deleted successfully with id = ' + id);
    }).catch(err => res.json(err))
  })

module.exports = router;
