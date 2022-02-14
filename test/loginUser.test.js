const request = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const { generateToken } = require('../middleware/jwtToken')
process.env.NODE_ENV = 'test'

const models = require('../database/models')

const user = {
  password: '12345678',
  email: 'joob1@example.com',
}

describe('USER LOGIN SUITE', () => {
  beforeAll(() => models.sequelize.sync())

  it('should not login user when email supplied does not exist', done => {
    request(app)
      .post('/users/login')
      .send({
        email: 'foo@bar.com',
        password: '12345678',
      })
      .then(response => {
        expect(response.status).toBe(400)
        done()
      })
  })

  it('should login a user with valid details', async () => {
    const foundUser = await models.User.findOne({
      where: { email: user.email },
    })
    const accessToken = generateToken(foundUser)
    const hashedPassword = await bcrypt.compare(
      user.password,
      foundUser.password
    )

    request(app)
      .post('/users/login')
      .send({ ...user, password: hashedPassword })
      .expect(200)
    return {
      accessToken: accessToken,
    }
  })

  afterAll(() => models.sequelize.sync({ force: true }))
})
