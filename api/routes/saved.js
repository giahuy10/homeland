var express = require('express')
var router = express.Router()
var model = require('../models').Saved
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
  .get('/:type', checkUserLogged, (req, res) => {
    // model.findAll({
    //   where: {
    //     type: req.params.type,
    //     createdBy: req.decoded.data.id
    //   }
    // })
    //   .then(data => {
    //     res.json(data)
    //   })
    //   .catch(err => res.json(err))
    let table = 'comments'
    if (req.params.type == 3) {
      table = 'properties'
    }
    if (req.params.type == 2) {
      table = 'news'
    }
    sequelize
    .query(`SELECT t.* FROM saveds as s INNER JOIN ${table} as t ON s.itemId = t.id where s.type = ${req.params.type} and s.createdBy = ${req.decoded.data.id}`, { raw: true })
    .then(data => {
      res.json(data[0])
    })
  })

  // Insert News
  .post('/', checkUserLogged, (req, res) => {
    req.body.createdBy = req.decoded.data.id
    model.findOne({
      where: {
        type: req.body.type,
        itemId: req.body.itemId,
        createdBy: req.decoded.data.id
      }
    })
      .then(data => {
        if (data) {
          activity.create({
            createdBy: req.decoded.data.id,
            type: 3,
            typeItem: req.body.type,
            itemId: data.id,
            note: req.body.title
          }).then(response => console.log(response)).catch(err => console.log(err))
          data.destroy().then(() => {
            res.json({msg: 'Removed'})
          }).catch(err => console.log(err))
        } else {
          model.create(req.body).then(data => {
            activity.create({
              createdBy: req.decoded.data.id,
              type: 2,
              typeItem: req.body.type,
              itemId: data.id,
              note: req.body.title
            }).then(response => console.log(response)).catch(err => console.log(err))
            res.send(data)
          }).catch(err => res.status(500).json(err))
        }
      })

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
