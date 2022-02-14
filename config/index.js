require('dotenv').config({ veborse: true })
/**
 **  All envs can be added and exported here
 */
module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
    access_token_life: process.env.ACCESS_TOKEN_LIFE,
  },
}
