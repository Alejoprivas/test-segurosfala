let express = require('express')
let Route = express()


Route.get('/test', (req, res, next) => {
    console.log("test")
  res.send('Sample route')
})

module.exports = Route