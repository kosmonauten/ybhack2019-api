const pool = require('../../db')


const getArticleIndex = async () => {
  const resArticleIndex = await pool.query(`
  SELECT scoring.id, SUM(scoring.score) AS score FROM (
    SELECT player.lastname, media_sentiment_article.id, media_sentiment_article, AVG(media_sentiment_sent_list."value") AS score
    FROM player, media_sentiment_player, media_sentiment_article, media_sentiment_sent_list
    WHERE player.id = media_sentiment_player.player
        AND media_sentiment_player.article = media_sentiment_article.id
        AND media_sentiment_sent_list.article = media_sentiment_article.id
    GROUP BY player.lastname, media_sentiment_article.id, media_sentiment_article.*
    ) AS scoring
    GROUP BY scoring.id
    ORDER BY score DESC
  `)
  .then(res => res)
  .catch(err => { throw err })
    
  return resArticleIndex.rows.reduce((r, e) => {
    r[e.id] = e.score;
    return r;
  }, {});
}

const getPopularityByUser = (request, response) => {
  const id = request.params.id

  /*pool.query('SELECT DISTINCT a.id, a.url, a.text, a.title, a.teaser FROM media_sentiment_article AS a JOIN media_sentiment_player msp on a.id = msp.article JOIN player p on p.id = msp.player WHERE p.id =  $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(200).json(results.rows)
  })
  */

  output = {
    "id": "232523k5220sda0ds0asf0asfsf",
    "firstname": "Firstname",
    "lastname": "Lastname",
    "picture": "http:///",
    "age": 325,
    "position": "Mittelfeld",
    "instagramNameUndAlias": "@fiddi",
    "instagramFollowers": 2892,
    "instagramFollowing": 29,
    "instagramPosts": 285,
    "facebookFollowers":4879,
    "twitterFollowers":8275,
    "twitterFollowings":285,
    "tiwtterPosts":23525,
    "substitute_in":24,
    "substitute_out":356,
    "subs_on_bench":2442,
    "minutes_played": 274657,
    "yellow_cards": 2,
    "red_cards":5,
    "second_yellow_cards":1,
    "goals":27,
    "appearances":729857,
    "minutesAverage": 2325,
    "asissts":23,
    "minutesToGoal":235,
    "minutesToAssist":23525,
    "totalFollowers": 235235,
    "performance": "19%",
    "popularity": "90%",
    "player_height": "1.95",
    "player_foot": "Left",
    "team_since": "2019-23-23",
    "contract_till": "2019-11-11",
    "market_value": 23235,
    "old_market_value": 235252,
    "date_birth": "2019-11-11",
    "shirt_number":10,
    "lineups": 32
  }

  response.status(200).json(output)
};

const getPressByUser = async (request, response) => {
    const id = request.params.id
  
    const resOne = await pool.query('SELECT msa.url, msa.text, msa.id, msa.title FROM media_sentiment_player sl JOIN media_sentiment_article msa on sl.article = msa.id WHERE sl.player = $1', [id])
    .then(res => res)
    .catch(err => {throw err})

    const resTwo = await getArticleIndex()
  
    console.log(resTwo)

    output = []
    
    for(entry in resOne.rows) {
      row = resOne.rows[entry]
      item = {
        'channel': 'blick',
        'title': row.title,
        'text': row.text.substr(0,100) + "...",
        'value': resTwo[row.id]
      }
      output.push(item)
    }

    response.status(200).json(output)
  };


  const getMediaByUser = (request, response) => {
    const id = request.params.id
  
    /*pool.query('SELECT DISTINCT a.id, a.url, a.text, a.title, a.teaser FROM media_sentiment_article AS a JOIN media_sentiment_player msp on a.id = msp.article JOIN player p on p.id = msp.player WHERE p.id =  $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      //response.status(200).json(results.rows)
    })
    */

    output = []
    output.push({
      "channel": "20min",
      "title": "Title vom News",
      "teaser": "<p>Cooles Tesesr</p>",
      "url": "https://20min.ch"
    },
    {
      "channel": "20min",
      "title": "Title vom News",
      "teaser": "<p>Cooles Tesesr</p>",
      "url": "https://20min.ch"
    },
    {
      "channel": "blick",
      "title": "Title vom News",
      "teaser": "<p>Cooles Tesesr</p>",
      "url": "https://20min.ch"
    },
    {
      "channel": "blick",
      "title": "Title vom News",
      "teaser": "<p>Cooles Tesesr</p>",
      "url": "https://20min.ch"
    })

    response.status(200).json(output)
  }


  const getMediaStats = (request, response) => {
    const id = request.params.id
  
    /*pool.query('SELECT DISTINCT a.id, a.url, a.text, a.title, a.teaser FROM media_sentiment_article AS a JOIN media_sentiment_player msp on a.id = msp.article JOIN player p on p.id = msp.player WHERE p.id =  $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      //response.status(200).json(results.rows)
    })
    */

    output = []
    output.push({
      "channel": "20min",
      "positive": [0.12,0.24,0.525,0.25,0.234,0.234],
      "negative": [-0.25,-0.23,-0.74,-0.66],
    },
    {
      "channel": "blick",
      "positive": [0.12,0.24,0.525,0.25,0.234,0.234],
      "negative": [-0.25,-0.23,-0.74,-0.66],
    },
    {
      "channel": "srf",
      "positive": [0.12,0.24,0.525,0.25,0.234,0.234],
      "negative": [-0.25,-0.23,-0.74,-0.66],
    })

    response.status(200).json(output)
  }

  const getPopularitySpider = async (request, response) => {
    const id = request.params.id

    const resOne = await pool.query('SELECT * FROM player_socialmediapopularity AS p WHERE p.player =  $1', [id])
    .then(res => res)
    .catch(err => {throw err})

    entry = resOne.rows[0]

    const resTwo = await pool.query('SELECT COUNT(*) FROM player')
    .then(res => res)
    .catch(err => {throw err})
    
    console.log(resOne.rows)

    output = {
      "score_max": parseInt(resTwo.rows[0]['count']),
      "score_now": entry.rank,
      "spider": [
      {
        "title": "follower_total_normalized",
        "prozent": entry.follower_total_normalized
      },
      {
        "title": "insta_follower_normalized",
        "prozent": entry.insta_follower_normalized
      },
      {
        "title": "insta_posts_normalized",
        "prozent": entry.insta_posts_normalized
      }
    ]}

    response.status(200).json(output)

  }

  module.exports = {
    getPopularityByUser,
    getPressByUser,
    getMediaByUser,
    getMediaStats,
    getPopularitySpider
  }