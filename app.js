"use strict";

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Get home route
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Home',
    seoDescription: 'SEO Description',
    seoKeywords: 'SEO Keyword'
  });
})

// Runs the Express server
app.listen(3000, function () {
  console.log(`App listening on port ${port}!`);
})
