var express = require('express')
var router = express.Router()
var model = require('../models').User
var multer   =  require( 'multer' )
var Jimp = require('jimp')
var checkUserLogged = require('../utils/checkUserLogged')
var moment = require('moment')
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

  // Delete News
  .delete('/:id', (req, res) => {
    model.destroy({
      where: { id: req.params.id }
    }).then(() => {
      res.status(200).send('deleted successfully with id = ' + id);
    }).catch(err => res.json(err))
  })

  // Upload image
  .post( '/upload', [upload.single( 'file' ) , checkUserLogged ], function( req, res, next ) {

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

    let heightThumb = 300
    let widthThumb = Math.ceil(heightThumb * dimensions.width / dimensions.height)
    let thumbnail = req.file.destination + '/thumb/'+moment().format('YYYY-MM-DD') +"-"+req.file.originalname
    let folder = '/images/'+req.headers.folder+'/'

    Jimp.read(req.file.destination + '/' + req.file.filename)
    .then(crop => {
      crop
        .resize(widthThumb, heightThumb) // resize
        .quality(100) // set JPEG quality
        // .greyscale() // set greyscale
        .write(thumbnail); // save
      return res.status( 200 ).json(
        {
          location: folder+req.file.filename,
          thumbnail: folder+'thumb/'+req.file.filename,
          height: dimensions.height,
          width: dimensions.width,
          widthThumb,
          heightThumb
        }
      )
    })
    .catch(err => {
      console.error(err);
    });
  })

module.exports = router;
