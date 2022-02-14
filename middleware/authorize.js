const { verifyToken } = require('./jwtToken')
const User = require('../database/models/User')

async function auth(req, res, next) {
  // check header or url parameters or post parameters for token
  try {
    var token = req.headers['authorization']
    if (!token) return res.status(401).json({ message: 'Invalid token' })

    token = token.replace('Bearer ', '')

    const decoded = verifyToken(token)
    req.user = decoded.userId

    next()
  } catch (error) {
    res.status(400).json({ err: error.message })
  }
}
module.exports = auth
