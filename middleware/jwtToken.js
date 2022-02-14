const jwt = require('jsonwebtoken')

const { auth } = require('../config')

// Verify Node env
const dev = process.env.NODE_ENV !== 'production'

// Generate Token for User
const generateToken = payload => {
  if (!payload) {
    return null
  }
  /*
   * *Return a payload of less sensitive data
   */
  payload = {
    email: payload.email,
    userId: payload.uuid,
  }

  const token = jwt.sign(payload, auth.jwt_secret, {
    expiresIn: auth.access_token_life,
  })

  return {
    token,
  }
}

// Verify Access Token and Refresh Token
const verifyToken = token => {
  const decoded = jwt.verify(token, `${auth.jwt_secret}`)
  return decoded
}

module.exports = {
  generateToken,
  verifyToken,
}
