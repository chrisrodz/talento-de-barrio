var express = require('express');
var app = express();

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index');
});

module.exports = app;
