"use strict";

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
//const mongojs = require('mongojs');

//const db = mongojs();
const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Hello World
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Home'
  });
})

// Runs the Express server
app.listen(3000, function () {
  console.log('App listening on port 3000!');
})
