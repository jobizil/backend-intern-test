const { body, check } = require('express-validator')

const validator = [
  body('email')
    .trim(' ')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email address')
    .normalizeEmail({ all_lowercase: true }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Minimum of 5 characters required for a valid password')
    .escape(),
]

module.exports = validator
