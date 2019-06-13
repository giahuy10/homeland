var express = require('express')
var router = express.Router()
var model = require('../models').User
var multer   =  require( 'multer' )

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

    let folder = '/images/'+req.headers.folder+'/'

    return res.status( 200 ).json( {location: folder+req.file.filename})

  })

module.exports = router;
