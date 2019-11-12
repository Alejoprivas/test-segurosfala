'use strict';

require('dotenv').config();
const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const fs = require('fs');
//const swaggerDocument = require('config/swagger.json');



app.listen(process.env.PORT || 9090 , process.env.HOST || '0.0.0.0' , function(){
  console.log("app is running "+process.env.PORT);
});

//get routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./routes/routes.js')(app, fs);

/*
app.use((req, res) => {
  res.status(404)
  res.send('invalid endpoint')
})
*/

//console.log(`Running on http://${HOST}:${PORT}`);