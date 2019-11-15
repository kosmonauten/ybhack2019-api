const pool = require('./db')

const getUsers = async (request, response) => {
    output = []

    const resOne = await pool.query('SELECT id, firstname, lastname FROM player ORDER BY id ASC')
    .then(res => res)
    .catch(err => {throw err})

    for(entry in resOne.rows) {
      row = resOne.rows[entry]
      console.log(row)
      output.push({
        'id': row.id,
        'firstname': row.firstname,
        'lastname': row.lastname,
        'performance': "19%",
        'popularity': "99%",
        "transfermarkt": 235252,
        "img": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Marco_W%C3%B6lfli.jpg"
      })
    }
    
    response.status(200).json(output)

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