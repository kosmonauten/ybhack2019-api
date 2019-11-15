const pool = require('./db')

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

const getPressByUser = (request, response) => {
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
      "channel": "facebook",
      "message": "<p>Cooles</p>"
    },
    {
      "channel": "twitter",
      "message": "<p>Cooles</p>"
    },
    {
      "channel": "instagram",
      "message": "<p>Cooles</p>"
    },
    {
      "channel": "yb",
      "message": "<p>Cooles</p>"
    })

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

  module.exports = {
    getPopularityByUser,
    getPressByUser,
    getMediaByUser
  }