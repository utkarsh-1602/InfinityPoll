const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    const token = req.headers['authorization'].split(' ')[1];
    
    console.log('<JWT Token>: ', token)
    console.log('<secret Token>: ', process.env.SECRET)


    // reference: https://www.npmjs.com/package//jsonwebtoken
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        // res.json({
        //   success: false,
        //   message: 'Failed to authenticate token',
        // });
        next(Error('Failed to authenticate token'));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // res.status(403).json({
    //   status: false,
    //   message: 'No token provided',
    // });

    next(Error('No token provided'));
    // Using next(Error('No token provided')) passes an error object to the next error-handling middleware, which can then handle the error appropriately (e.g., logging, sending an error response).
    // When you call res.json() or similar methods, you're sending a response back to the client.
    // This ends the request-response cycle. After sending the response, no further middleware functions or route handlers will be executed.
    // If you send a response directly from within a middleware without calling next(), it bypasses any subsequent middleware functions and ends the request-response cycle immediately.
    // Using next() allows for more flexible control flow and error handling, while res.json() immediately ends the request-response cycle by sending a response back to the client.
  }
};
