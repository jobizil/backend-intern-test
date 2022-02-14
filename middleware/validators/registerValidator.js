const { body } = require('express-validator')

const validators = [
  body('first_name').trim(' ').notEmpty().withMessage('Name is required'),
  body('last_name').trim(' ').notEmpty().withMessage('Name is required'),
  body('email')
    .trim(' ')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email address')
    .normalizeEmail({ all_lowercase: true }),
  body('phone_number')
    .notEmpty()
    .withMessage('Phone number is required')
    .isInt()
    .withMessage('Phone number should contain numeric values only.')
    .trim(' '),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Minimum of 5 characters required for a valid password')
    .escape(),
]
module.exports = validators
