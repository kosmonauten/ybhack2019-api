const pool = require('./db')

const getPerformanceByUser = async (request, response) => {
    const id = request.params.id
    output = []

    const resOne = await pool.query('SELECT DISTINCT a.id, a.url, a.text, a.title, a.teaser FROM media_sentiment_article AS a JOIN media_sentiment_player msp on a.id = msp.article JOIN player p on p.id = msp.player WHERE p.id =  $1', [id])
    .then(res => res)
    .catch(err => {throw err})

    for(entry in resOne.rows) {
      row = resOne.rows[entry]
      output.push(row)
    }
    
    response.status(200).json(output)
  }

  module.exports = {
    getPerformanceByUser
  }