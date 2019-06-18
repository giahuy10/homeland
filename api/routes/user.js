var express = require('express')
var router = express.Router()
var model = require('../models').User
var passwordHash = require('password-hash')
var multer   =  require( 'multer' )
var jwt = require('jsonwebtoken')
var checkUserLogged = require('../utils/checkUserLogged')
var moment = require('moment')
var activity = require('../models').Activity
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req.params)
    // console.log(req.body)
    // console.log(req.headers)
    // console.log(req.query)
    cb(null, './static/images/' + req.headers.folder)
  },
  filename: function (req, file, cb) {
    cb(null, moment().format('YYYY-MM-DD') +"-"+file.originalname)
  }
})

var upload   =  multer( {storage: storage} )
var sizeOf   =  require( 'image-size' )
router
  // Get all News
  .get('/', (req, res) => {
    // model.findAll().then(data => res.json(data)).catch(err => res.json(err))
    model.findAndCountAll()
      .then(data => {
        var limit = req.query.perPage ? parseInt(req.query.perPage) : 20
        var currentPage = req.query.currentPage ? parseInt(req.query.currentPage) : 1
        var totalPages = Math.ceil(data.count / limit)
        var offset = limit * (currentPage - 1)
        model.findAll({
          attributes: { exclude: ['password', 'token'] },
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
    model.findByPk(req.params.id).then(data => res.json(data)).catch(err => res.json(err))
  })

  .post('/checkEmail', (req, res) => {
    model.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(data => {
        if (data) {
          let token = jwt.sign( {data}, 'LOIKPOKLSK1029KJ')
          res.json( { token, user: data} )
        } else {
          res.status(404).json({ 'msg' : 'Not found '+req.params.email })
        }
      })
  })
  // Insert new user
  .post('/', (req, res) => {
    req.body.password = passwordHash.generate(req.body.password)
    req.body.state = 1
    req.body.level = 1
    model.create(req.body)
      .then(data => {
        let token = jwt.sign( {data}, 'LOIKPOKLSK1029KJ')
        res.json( { token, user: data} )
      })
      .catch(err => res.json(err))
  })

  // Login
  .post('/login', (req, res) => {
    model.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(data => {
        if (data) {
          if (passwordHash.verify(req.body.password, data.password)) {
            let token = jwt.sign( {data}, 'LOIKPOKLSK1029KJ')
            res.json( { token, user: data} )
          } else {
            res.status(401).json({ 'msg' : 'Mật khẩu không chính xác' })
          }
        } else {
          res.status(404).json({ 'msg' : 'Không tìm thấy tài khoản' })
        }
      })
      .catch(err => res.status(500).json({err: err}))
  })

  // Verify account
  .post('/verify/:token', (req, res) => {

  })

  // Update News
  .put('/:id', (req, res) => {
    if (req.body.updatePassword) {
      req.body.password = passwordHash.generate(req.body.updatePassword)
    }
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

  // Upload image
  .post( '/upload', upload.single( 'file' ), function( req, res, next ) {

    if ( !req.file.mimetype.startsWith( 'image/' ) ) {
      return res.status( 422 ).json( {
        error : 'The uploaded file must be an image'
      } );
    }

    var dimensions = sizeOf( req.file.path );

    if ( ( dimensions.width < 200 ) || ( dimensions.height < 120 ) ) {
      return res.status( 422 ).json( {
        error : 'The image must be at least 200 x 120px'
      } );
    }

    let folder = '/images/news/'

    return res.status( 200 ).json( {location: folder+req.file.filename})

  })

  .get('/stat/:type/:id', (req, res) => {
    // type: news, properties
    model.findByPk(req.params.id, {
      include: [req.params.type]
    })
    .then(data => res.json(data))
    .catch(err => res.json(err))

  })

module.exports = router;
