'use strict';

require('dotenv').config();
const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('config/swagger.json');
const routes = require('./router/sampleRoute')


//Start app



app.listen(process.env.PORT || 9090 , process.env.HOST || '0.0.0.0' , function(){
  console.log("app is running "+process.env.PORT);
});

//get routes
app.use(routes);

app.use((req, res) => {
  res.status(404)
  res.send('invalid endpoint')
})


//console.log(`Running on http://${HOST}:${PORT}`);