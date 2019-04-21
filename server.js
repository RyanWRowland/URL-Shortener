'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var urlHandler = require('./controllers/urlHandler');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
mongoose.connection.on('connected', function() {
  console.log('Mongoose db connection connected');
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose db connection disconnected');
});

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// api/shorturl/new post route
// create a short url
app.post("/api/shorturl/new", urlHandler.newUrl);

app.get("/api/shorturl/:short", urlHandler.shortUrl);

app.listen(port, function () {
  console.log('Node.js listening ...');
});