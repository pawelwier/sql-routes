const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
  development: {
    username: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    host: process.env.SQL_HOST,
    dialect: "mysql"
  },
  test: {
    username: "",
    password: "",
    database: "test",
    host: "",
    dialect: "mysql"
  },
  production: {
    username: "",
    password: "",
    database: "production",
    host: "",
    dialect: "mysql"
  }
}
