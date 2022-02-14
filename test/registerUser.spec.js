const request = require('supertest')
const app = require('../app')
const models = require('../database/models')

const user = {
  first_name: 'John',
  last_name: 'Doe',
  password: '12345678',
  phone_number: '12345678',
  email: 'joob1@example.com',
}

describe('USER REGISTRATION SUITE', () => {
  beforeAll(() => models.sequelize.sync({ force: true }))

  it('should create a user when all params are valid', done => {
    request(app)
      .post('/users/register')
      .send(user)
      .expect(201)
      .then(response => {
        expect(response.status).toBe(201)
        done()
      })
  })

  it('should not create a user when email supplied already exist', done => {
    request(app)
      .post('/users/register')
      .send({
        ...user,
        password: '12345678',
      })
      .then(response => {
        expect(response.status).toBe(409)

        done()
      })
  })
})
