var express = require('express')
var router = express.Router()
var model = require('../models').PropertyRating
var sequelize = require('../models').sequelize
var checkUserLogged = require('../utils/checkUserLogged')
var activity = require('../models').Activity
router
  // Get all News
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

  // Get detail News by ID
  .get('/:id', (req, res) => {
    model.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('location')), 'location_avg'],
        [sequelize.fn('AVG', sequelize.col('price')), 'price_avg'],
        [sequelize.fn('AVG', sequelize.col('progress')), 'progress_avg'],
        [sequelize.fn('AVG', sequelize.col('quality')), 'quality_avg'],
        [sequelize.fn('AVG', sequelize.col('design')), 'design_avg']
      ],

      where: {
        proId: req.params.id
      }
    })
      .then(data => {
        res.json(data)
      })
      .catch(err => res.json(err))
  })

  // Insert News
  .post('/', checkUserLogged, (req, res) => {
    req.body.createdBy = req.decoded.data.id
    // req.body.state = 1
    model.create(req.body).then(data => {
      // save activity
      activity.create({
        createdBy: req.decoded.data.id,
        type: 1,
        typeItem: 4,
        itemId: data.id,
        note: req.body.title
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
