var express = require('express')
var router = express.Router()
var model = require('../models').Activity
var checkUserLogged = require('../utils/checkUserLogged')

router
  // Get all News
  .get('/', checkUserLogged, (req, res) => {
    model.findAndCountAll({
      where: {
        createdBy: req.decoded.data.id
      }
    })
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 18
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        model.findAll({
          where: {
            createdBy: req.decoded.data.id
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
    req.body.createdBy = req.decoded.data.id
    // req.body.state = 1
    model.create(req.body).then(data => res.send(data)).catch(err => res.status(500).json(err))
  })

module.exports = router;
