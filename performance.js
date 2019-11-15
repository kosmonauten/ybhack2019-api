const pool = require('./db')

const getPerformanceSpider = async (request, response) => {
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
      "score_max": 24,
      "score_now": 3,
      "spider": [
      {
        "title": "Tore",
        "prozent": 0.6
      },
      {
        "title": "asdgasgas",
        "prozent": 0.1
      },
      {
        "title": "Tasgasgasstet",
        "prozent": 0.9
      },
      {
        "title": "hdfgjdfdg",
        "prozent": 0.3
      },
      {
        "title": "dustjsdhd",
        "prozent": 0.3
      },
      {
        "title": "djfdfsdg",
        "prozent": 0.8
      },
      {
        "title": "Tstet",
        "prozent": 0.6
      },
      {
        "title": "Tstet",
        "prozent": 0.6
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