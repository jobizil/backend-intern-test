const { validationResult } = require('express-validator')

const bcrypt = require('bcrypt')
const { User } = require('../database/models')
const { generateToken } = require('../middleware/jwtToken')
/** .
 * @routes      POST /api/auth/register
 */
const registerUser = async (req, res) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res
        .status(400)
        .json({ error: error.array({ onlyFirstError: true })[0].msg })
    }

    const { first_name, last_name, email, phone_number, password } = req.body

    const existingEmail = await User.findOne({ where: { email } })
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already exists.' })
    }
    const createUser = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password,
    })

    //Generate Access Token
    const accessToken = generateToken(createUser)

    return res.status(201).json({
      message:
        'Account created successfully. Kindly login to access account profile.',
      accessToken: accessToken.token,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

/**
 * @description Validates registered user and allows them signin
 * @routes      POST /api/auth/login
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return validationError(req, res, error)
  }
  const foundUser = await User.findOne({ where: { email } })

  if (!foundUser) {
    return res.status(400).json({ message: 'Invalid Username or Password.' })
  }
  if (
    !foundUser.email ||
    !(await bcrypt.compare(password, foundUser.password))
  ) {
    return res.status(400).json({ message: 'Invalid Username or Password.' })
  }

  //Generate Access Token
  const accessToken = generateToken(foundUser)

  return res.status(200).json({
    message: 'Login Successful',
    accessToken: accessToken.token,
  })
}

/**
 * @routes      GET /api/users/:uuid
 * @access      Private
 */

const userProfile = async (req, res) => {
  const { uuid } = req.params
  const userId = req.user

  const user = await User.findOne({ where: { uuid } })

  if (userId !== uuid) {
    return res.sendStatus(403)
  }
  if (user) {
    return res.status(200).json({
      status: 'Success',
      data: user,
    })
  } else {
    return res.status(400).json({ message: 'Invalid User Id' })
  }
}
module.exports = { registerUser, loginUser, userProfile }
