var express = require('express');
var router = express.Router();

const user = require('./player')
const popularity = require('./popularity')
const performance = require('./performance')

router.get('/', (request, response) => {response.json({ info: 'Node.js, Express, and Postgres API' })});
router.get('/users', user.getUsers)
router.get('/users/:id', user.getUserById)
router.get('/popularity/press', popularity.getMediaStats)
router.get('/popularity/user/:id', popularity.getPopularityByUser)
router.get('/popularity/press/:id', popularity.getPressByUser)
router.get('/popularity/spider/:id', popularity.getPopularitySpider)
router.get('/popularity/media/:id', popularity.getMediaByUser)
router.get('/performance/spider/:id', performance.getPerformanceSpider)
router.get('/performance/user/:id', performance.getPerformanceByUser)

module.exports = router;