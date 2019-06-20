var express = require('express')
var router = express.Router()
var model = require('../models').PropertyMedia
var checkUserLogged = require('../utils/checkUserLogged')


router
  // Get all News
  .get('/', (req, res) => {
    model.findAndCountAll({
      where: {
        proId: 1,
        type: req.query.type
      }
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        model.findAll({
          where: {
            proId: 1,
            type: req.query.type
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


  // Insert News
  .post('/', checkUserLogged, (req, res) => {
    req.body.createdBy = req.decoded.data.id,
    model.create(req.body).then(data => {
        res.json(data)
    }).catch(err => res.status(500).json(err))
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
