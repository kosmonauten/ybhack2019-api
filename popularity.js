const pool = require('./db')

const getPressByUser = (request, response) => {
    const id = request.params.id
  
    pool.query('SELECT DISTINCT a.id, a.url, a.text, a.title, a.teaser FROM media_sentiment_article AS a JOIN media_sentiment_player msp on a.id = msp.article JOIN player p on p.id = msp.player WHERE p.id =  $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getPressByUser
  }