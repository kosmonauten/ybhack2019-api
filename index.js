const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

const user = require('./player')
const popularity = require('./popularity')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.get('/users', user.getUsers)
app.get('/users/:id', user.getUserById)
app.get('/popularity/user/:id', popularity.getPressByUser)

