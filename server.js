var express = require('express');
var path = require('path');
var app = express();

// Routes
var routes = require('./routes');

// Configuration
app.configure(function() {
  // Use jade for views
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  // Static files directory
  app.use(express.static(__dirname + '/public'));
  // Show log for all requests in console	
  app.use(express.logger('dev'));
  // Serve routes from router
  app.use('/talent', routes);
});

// Load index page
app.get('*', function(req, res) {						
    res.sendfile('./public/index.html');				
});

// Listen to port 8080 and run the server
app.listen(8080, function() {
    console.log('App listening on port 8080');
});