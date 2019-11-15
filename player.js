require('dotenv-safe').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_ADMIN_USER,
  host: process.env.DB_ADMIN_HOST,
  database: process.env.DB_ADMIN_DB,
  password: process.env.DB_ADMIN_PASS,
  port: 5432,
  ssl: process.env.DB_ADMIN_SSL
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM player ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = request.params.id
  
    pool.query('SELECT * FROM player WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUsers,
    getUserById
  }