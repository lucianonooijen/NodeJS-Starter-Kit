"use strict";

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Hello World
app.get('/', function (req, res) {
  res.send('Hello World!');
})

// Runs the Express server
app.listen(3000, function () {
  console.log('App listening on port 3000!');
})
