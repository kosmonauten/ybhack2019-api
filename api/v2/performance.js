const pool = require('../../db')

const getPerformanceSpider = async (request, response) => {
    const id = request.params.id
    output = {}

    const resOne = await pool.query('SELECT * FROM player_performance AS p WHERE p.player =  $1', [id])
    .then(res => res)
    .catch(err => {throw err})

    entry = resOne.rows[0]

    const resTwo = await pool.query('SELECT COUNT(*) FROM player')
    .then(res => res)
    .catch(err => {throw err})
    
    output = {
      "score_max": parseInt(resTwo.rows[0]['count']),
      "score_now": entry.rank_total,
      "spider": [
      {
        "title": "goals_normalized",
        "prozent": entry.goals_normalized
      },
      {
        "title": "assists_normalized",
        "prozent": entry.assists_normalized
      },
      {
        "title": "minutes_to_goal",
        "prozent": entry.minutes_to_goal
      },
      {
        "title": "minutes_to_assists",
        "prozent": entry.minutes_to_assists
      },
      {
        "title": "minutes_normalized",
        "prozent": entry.minutes_normalized
      },
      {
        "title": "lineups_normalized",
        "prozent": entry.lineups_normalized
      },
      {
        "title": "appearances_normalized",
        "prozent": entry.appearances_normalized
      },
      {
        "title": "yellow_normalized",
        "prozent": entry.yellow_normalized
      }
    ]}

    response.status(200).json(output)
  }

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
    
    output = {
      "id": "232523k5220sda0ds0asf0asfsf",
      "firstname": "Firstname",
      "lastname": "Lastname",
      "picture": "http:///",
      "age": 325,
      "position": "Mittelfeld",
        "yellow_cards": 2,
        "red_cards":5,
        "minutesAverage": 2325,
        "asissts":23,
        "minutesToGoal":235,
        "minutesToAssist":23525,
        "minutesAverageToPlayer":2525,
        "lineups": 32,
        "performance": "19%",
        "popularity": "90%",
    }

    response.status(200).json(output)
  }

  module.exports = {
    getPerformanceByUser,
    getPerformanceSpider
  }