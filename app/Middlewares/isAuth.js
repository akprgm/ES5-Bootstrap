const jwt = require('jsonwebtoken');

let isAuth = function isAuth(request, response, next) {

	// check header or url parameters or post parameters for token
  var token = request.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, process.env.APP_KEY, function(err, decoded) {      
      if (err) {
        return response.status(401).send({
        	message: 'invalid authentication token.'
        });    
      } else {
        next();
      }
    });

  } else {

    // if there is no token
    return response.status(403).send({ 
        message: 'No token provided.' 
    });

  }
};

module.exports = isAuth;