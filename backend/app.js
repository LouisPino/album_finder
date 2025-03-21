var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
// require('./config/database.js')
require(path.join(__dirname, 'config', 'database.js'));
const FRONTEND_URL = process.env.FRONTEND_URL


var app = express();
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000', "https://listento.netlify.app", "https://listentoronto.ca"], // Allow only your frontend
  methods: 'GET, POST, PUT , DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // If you're using cookies or authentication
}));


var indexRouter = require('./routes/index');
var albumsRouter = require('./routes/albums');
var artistRouter = require('./routes/artists');
var userRouter = require('./routes/users');
var commentRouter = require('./routes/comments');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/albums', albumsRouter);
app.use('/artists', artistRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
