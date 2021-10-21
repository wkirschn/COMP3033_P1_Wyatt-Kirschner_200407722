var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// This is used to import the Mongoose and Globals needed for API

const mongoose = require('mongoose');
const config = require('./config/globals');

// Endpoint for the Web Application

var indexRouter = require('./routes/index');

// Endpoint for the API

const contactRouter = require('./routes/api/contacts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Since the endpoint was stated, we need to enable it to use it
// Schema of using HTTP verbs will be stated here

app.use('/api/contacts', contactRouter);

// Connect to mongo db after the router configuration is completed

mongoose.connect(config.db,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((message) => {
  console.log('Successfully connected to the MongoDB Server!');

}).catch((error) => {
  console.log('There has been an error when connecting to MongoDB!');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
