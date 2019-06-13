var secretKey = 'LOIKPOKLSK1029KJ'
var jwt = require('jsonwebtoken')
var checkUserLogged = (req, res, next) => {
    // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['access-token'] || req.headers['token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ success: false, msg: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).json({
      success: false,
      msg: 'No token provided.'
    });
  }
}

module.exports = checkUserLogged;
