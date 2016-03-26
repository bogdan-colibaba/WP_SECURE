var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var upload = require('jquery-file-upload-middleware');
var app = express();


//region **** upload middleware config ****
//info:www.npmjs.com/package/jquery-file-upload-middleware

upload.configure({
  uploadDir: __dirname + '/public/uploads/',
  uploadUrl: '/uploads'
});

/// Redirect all to home except post
app.get('/upload', function( req, res ){
  res.redirect('/');
});

app.put('/upload', function( req, res ){
  res.redirect('/');
});

app.delete('/upload', function( req, res ){
  res.redirect('/');
});

app.use('/upload', function(req, res, next){
  upload.fileHandler({
    uploadDir: function () {
      return __dirname + '/public/uploads/'
    },
    uploadUrl: function () {
      return '/uploads'
    }
  })(req, res, next);
});
//endregion


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(82,function () {

  var host = server.address().address
  var port = server.address().port

  console.log("server: app.js: listening at http://%s:%s", host, port)
});
module.exports = app;
