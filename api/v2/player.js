const pool = require('../../db')

const getPopularityIndex = async () => {
  const resPopularity = await pool.query(`
    SELECT scoring.id, SUM(scoring.score) AS score FROM (
      SELECT player.id, media_sentiment_article.title, AVG(media_sentiment_sent_list."value") AS score
      FROM player, media_sentiment_player, media_sentiment_article, media_sentiment_sent_list
      WHERE player.id = media_sentiment_player.player
          AND media_sentiment_player.article = media_sentiment_article.id
          AND media_sentiment_sent_list.article = media_sentiment_article.id
      GROUP BY player.id, media_sentiment_article.title
      ) AS scoring
    GROUP BY scoring.id`)
    .then(res => res)
    .catch(err => { throw err })
    
    return resPopularity.rows.reduce((r, e) => {
      r[e.id] = e.score;
      return r;
    }, {});
}

const getUsers = async (request, response) => {
    output = []

    const resOne = await pool.query('SELECT id, firstname, lastname, playerimage FROM player ORDER BY id ASC')
    .then(res => res)
    .catch(err => {throw err})

    const popularityIndex = await getPopularityIndex()

    for(entry in resOne.rows) {
      row = resOne.rows[entry]
      if(row.playerimage == null) { row.playerimage = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
      output.push({
        'id': row.id,
        'firstname': row.firstname,
        'lastname': row.lastname,
        'performance': "19%",
        'popularity': (popularityIndex[row.id] * 100).toFixed(2) + '%',
        "transfermarkt": 235252,
        "img": row.playerimage
      })
    }
    
    response.status(200).json(output)

}

const getUserById = async (request, response) => {
    const id = request.params.id
  
    const resOne = await pool.query('SELECT * FROM player WHERE id = $1', [id], (error, results) => {
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