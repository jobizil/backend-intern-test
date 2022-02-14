var express = require('express')

const auth = require('../middleware/authorize')

const {
  registerUser,
  loginUser,
  userProfile,
} = require('../controllers/userController')
const userRegisterValidator = require('../middleware/validators/registerValidator')
const loginValidator = require('../middleware/validators/loginValidator')

var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/register', userRegisterValidator, registerUser)

router.route('/login').post(loginValidator, loginUser)
router.route('/users/:uuid').get(auth, userProfile)

module.exports = router
