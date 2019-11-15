require('dotenv-safe').config()
const Pool = require('pg').Pool
const connection = new Pool({
  user: process.env.DB_ADMIN_USER,
  host: process.env.DB_ADMIN_HOST,
  database: process.env.DB_ADMIN_DB,
  password: process.env.DB_ADMIN_PASS,
  ssl: false,
  port: 5432
})

module.exports = connection;