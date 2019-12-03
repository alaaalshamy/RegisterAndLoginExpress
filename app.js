var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-plants-secure', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
//const isProduction = process.env.NODE_ENV === 'production';

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// if(!isProduction) {
//   app.use(errorHandler());
// }
mongoose.connect("mongodb://plantsbd:lUx2fggPv5Rprd5SM9p7XcRj5qISM9MueYCqL06EFEtptDD5aySjUjBMr9qXImvjAT2tnJKRygrdirpSxWcf8g==@plantsbd.documents.azure.com:10255/?ssl=true",{useUnifiedTopology: true,useNewUrlParser :true});
// mongoose.set('debug', true)
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
