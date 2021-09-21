const jwt = require('jsonwebtoken')
const HttpError = require('../models/http-error')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(' ')[1]

    if (!token) {
      throw new Error('Authentication failed')
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)

    req.userData = { userId: decodedToken.userId }

    next()
  } catch (err) {
    return next(new HttpError('Authentication failed'), 401)
  }
}
