var express = require('express')
var router = express.Router()
var model = require('../models').User
var passwordHash = require('password-hash')
var multer   =  require( 'multer' )
var jwt = require('jsonwebtoken')
//var checkUserLogged = require('../utils/checkUserLogged')
var sequelize = require('../models').sequelize
var moment = require('moment')
var sendMail = require('../utils/sendMail')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {

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
  .get('/top', (req, res) => {
    sequelize.query("SELECT u.*, count(a.`createdBy`) as activities FROM `activities` as a INNER JOIN `users` as u ON u.id = a.createdBy group by a.`createdBy` order by activities desc limit 0, 9", { type: sequelize.QueryTypes.SELECT})
      .then(users => {
        res.json(users)
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
        email: req.body.email ?  req.body.email : 'email'
      }
    })
      .then(data => {
        if (data) {
          let token = jwt.sign( {data}, 'LOIKPOKLSK1029KJ', { expiresIn: 60 * 60 })
          res.json( { token, user: data} )
        } else {
          res.status(404).json({ 'msg' : 'Not found '+req.params.email })
        }
      })
  })
  // Insert new user
  .post('/', (req, res) => {
    req.body.password = passwordHash.generate(req.body.password)
    req.body.state = -1
    req.body.level = 1
    model.create(req.body)
      .then(data => {
        let token = jwt.sign( {data}, 'LOIKPOKLSK1029KJ', { expiresIn: 60 * 30 })
        let htmlEmail = ''
        htmlEmail += `<h4>Xin chào ${req.body.firstName} ${req.body.lastName}</h4>`
        htmlEmail += `<p>Bạn đã đăng ký tài khoản tại http://homenland.vn</p>`
        htmlEmail += `<p>Để kích hoạt tài khoản bạn vui lòng click <a href="http://homenland.vn/verify?token=${token}"> vào đây</a> hoặc copy và paste đường link phía dưới vào trình duyệt</p>`
        htmlEmail += `<p>http://homenland.vn/verify?token=${token}</p>`
        sendMail(req.body.email, 'Kích hoạt tài khoản tại Homenland', '', htmlEmail)
        res.json( { token } )
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
          if (data.state == 1) {
            if (passwordHash.verify(req.body.password, data.password)) {
              let token = jwt.sign( {data}, 'LOIKPOKLSK1029KJ', { expiresIn: 60 * 60 * 24 * 30 })
              res.json( { token, user: data} )
            } else {
              res.status(401).json({ 'msg' : 'Mật khẩu không chính xác' })
            }
          } else {
            res.status(401).json({ 'msg' : 'Tài khoản chưa được kích hoạt' })
          }

        } else {
          res.status(404).json({ 'msg' : 'Không tìm thấy tài khoản' })
        }
      })
      .catch(err => res.status(500).json({err: err}))
  })

  // Verify account
  .post('/verify', (req, res) => {
    jwt.verify(req.query.token, 'LOIKPOKLSK1029KJ', (err, decoded) => {
      if (err) {
          res.status(403).json({ success: false, msg: 'Token không hợp lệ.', err });
        } else {
          model.update(
            {
              state: 1
            },
            { where: {id: decoded.data.id} }
          ).then(() => {
            console.log('ok')
          }).catch(err => console.log(err))

          let tokenData = decoded.data
          let token = jwt.sign( {tokenData}, 'LOIKPOKLSK1029KJ',  { expiresIn: 60 * 60 * 24 * 30 })
          res.json( { token, user: decoded.data} )
        }
    })
  })
  .post('/forgot/:email', (req, res) => {
    model.findOne({
      where: {
        email: req.params.email ?  req.params.email : 'email'
      }
    })
    .then(data => {
      if (data) {
        let token = jwt.sign( {data}, 'LOIKPOKLSK1029KJ', { expiresIn: 60 * 5 })
        let htmlEmail = ''
        htmlEmail += `<h4>Xin chào ${data.firstName} ${data.lastName}</h4>`
        htmlEmail += `<p>Bạn đã yêu cầu tìm lại mật khẩu tài khoản tại http://homenland.vn</p>`
        htmlEmail += `<p>Để đặt một khẩu mới bạn vui lòng click <a href="http://homenland.vn/reset?token=${token}"> vào đây</a> hoặc copy và paste đường link phía dưới vào trình duyệt</p>`
        htmlEmail += `<p>http://homenland.vn/reset?token=${token}</p>`
        sendMail(req.params.email, 'Yêu cầu đổi mật khẩu tại Homenland', '', htmlEmail)
        res.json({token})
      } else {
        res.status(404).json({ success: false, msg: 'Không tìm thấy email trong hệ thống' });
      }
    })
    .catch(err => res.json(err))
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
