const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
  process.env.SQL_DB_NAME,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    dialect: 'mysql',
    port: process.env.SQL_DB_PORT,
  }
)

module.exports = sequelize
