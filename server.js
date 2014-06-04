var express = require('express');
var fs = require('fs');
var path = require('path');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var FilePreviews = require('filepreviews');

var mongo = require('mongoskin');
var mongoUri = process.env.MONGOHQ_URL  || 'mongodb://localhost:27017/talento';
var db = mongo.db(mongoUri);

// FilePreviews.io
var previews = new FilePreviews({debug: true});

// Get LinkedIN keys from local environment variables
var LINKEDIN_API_KEY = process.env.LINKEDIN_API_KEY;
var LINKEDIN_SECRET_KEY = process.env.LINKEDIN_SECRET_KEY;

var app = express();

// Configuration
app.configure(function() {
  // Use jade for views
  app.set('views', path.join(__dirname, 'public/views'));
  app.set('view engine', 'jade');
  // Static files directory
  app.use(express.static(__dirname + '/public'));
  // Show log for all requests in console	
  app.use(express.logger('dev'));
  // Middleware!
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieSession({ secret: 'tumaieslagorda' }));
  // Passport for LinkedIn functionality
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function(req, res, next) {
    req.db = db;
    next();
  });
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:8080/talent/auth/linkedin/callback",
    profileFields: ['id', 'first-name', 'last-name', 'headline', 'summary', 'picture-url']
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


app.get('/talent', function(req, res) {
  res.render('index', { user: req.user });
});

app.get('/talent/account', ensureAuthenticated, function(req, res) {
  res.render('account', { user: req.user });
});

app.get('/talent/login', function(req, res) {
  res.render('login', {user: req.user });
});

app.get('/talent/auth/linkedin', 
  passport.authenticate('linkedin', {failureRedirect: '/talent/login' }),
  function(req, res) {
    res.redirect('/talent');
  }
);

app.get('/talent/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/talent/register');
  });

app.get('/talent/logout', function(req, res) {
  req.logout();
  res.redirect('/talent');
});

app.get('/talent/register', ensureAuthenticated, function(req, res) {
  res.render('register', { user: req.user });
});

app.post('/talent/register', ensureAuthenticated, function(req, res) {
  previews.generate(req.body.resume, function(err, results) {
    completeUser = req.body;
    completeUser.resume = results.previewURL;
    completeUser.information = req.user._json;
    completeUser.local_id = req.user.id;
    req.db.collection('users').insert(completeUser, function(err, result) {
      res.redirect('/talent/profile/'+req.user.id);
    });
  });
});

app.get('/talent/profile/:local_id', function(req, res) {
  db.collection('users').findOne({local_id: req.params.local_id}, function(err, result) {
    console.log(result);
    res.render('profile', { user: req.user, user_profile: result });
  });
});

// Load index page
app.get('/mapa', function(req, res) {						
  res.sendfile('./public/index.html');	
});

// Listen to port 8080 and run the server
app.listen(8080, function() {
  console.log('App listening on port 8080');
});

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {return next();}
  res.redirect('/login');
}