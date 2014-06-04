var express = require('express');
var path = require('path');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

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
    profileFields: ['first-name', 'last-name', 'headline', 'summary']
  },
  function(token, tokenSecret, profile, done) {
    // console.log(profile);
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
    console.log(req.user);
    res.redirect('/talent');
  });

app.get('/talent/logout', function(req, res) {
  req.logout();
  res.redirect('/talent');
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