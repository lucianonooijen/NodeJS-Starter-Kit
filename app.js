// Dependencies
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const express = require('express');
const expressValidator = require('express-validator');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

// View engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Register handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

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
app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
})
