const { database, env } = require('./index')
module.exports = {
  development: {
    username: database.username,
    password: database.password,
    database: database.database,
    host: database.host,
    dialect: database.dialect,
  },

  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
}
