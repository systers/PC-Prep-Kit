// Get dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const async = require('async');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

// Database configuration
// Database configuration
//Models
const models = require("./database/models");
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

const app = express();

// Get our API routes
const api = require('./routes/api');

// test api route
const test=require('./routes/test');

// uncomment after placing your favicon in /public
//const favicon = require('serve-favicon');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(session({
	secret : 'PC Prep Kit Secret',
	saveUninitialized: true,
	resave: true
}));

// passport and persistent session initialization 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Set up passport configurations
const passportSetup = require('./config/passport')(passport, models);

// Set test routes
app.use('/test',test);

// Set api routes
app.use('/api', api);

// Set authentication routes
const auth = express.Router();
require('./routes/auth.js')(auth, passport, async, nodemailer, crypto, models);
app.use('/auth', auth);

// Set other routes
const index = express.Router();
require('./routes/index.js')(index, passport, path);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = app;
