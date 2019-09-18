const jwt = require('jsonwebtoken')

const secret = require('../config/secrets')
module.exports = (req, res, next) => {
  const token = req.headers.authorization


  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decoded) => {
      if(err){
        //token expired or is invalid
        res.status(401).json({ message: 'Invalid Credentials' })
      } else {
        //token goood.
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'no credentials provided'})
  }
}
