const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

const user = require('./player')
const popularity = require('./popularity')
const performance = require('./performance')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/v1/users', user.getUsers)
app.get('/v1/users/:id', user.getUserById)
app.get('/v1/popularity/press', popularity.getMediaStats)
app.get('/v1/popularity/user/:id', popularity.getPopularityByUser)
app.get('/v1/popularity/press/:id', popularity.getPressByUser)
app.get('/v1/popularity/spider/:id', popularity.getPopularitySpider)
app.get('/v1/popularity/media/:id', popularity.getMediaByUser)
app.get('/v1/performance/spider/:id', performance.getPerformanceSpider)
app.get('/v1/performance/user/:id', performance.getPerformanceByUser)


app.get('/users', user.getUsers)
app.get('/users/:id', user.getUserById)
app.get('/popularity/press', popularity.getMediaStats)
app.get('/popularity/user/:id', popularity.getPopularityByUser)
app.get('/popularity/press/:id', popularity.getPressByUser)
app.get('/popularity/spider/:id', popularity.getPopularitySpider)
app.get('/popularity/media/:id', popularity.getMediaByUser)
app.get('/performance/spider/:id', performance.getPerformanceSpider)
app.get('/performance/user/:id', performance.getPerformanceByUser)

