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


// Origins allowed to WRITE. Reads are open to everyone (see below).
const ALLOWED_ORIGINS = [
  FRONTEND_URL,
  "https://listento.netlify.app",
  "https://listentoronto.com",
].filter(Boolean);

// Any local dev server, whatever port it picked — CRA on 3000, Live Server on
// 5501, python http.server on 8000. localhost and 127.0.0.1 are separate
// origins to the browser, so both spellings have to be covered.
const LOCALHOST = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

/**
 * Two policies, split by method.
 *
 * GET is public data — anyone can already curl it, so an origin allowlist
 * would only stop other sites' browser code from reading what is public
 * anyway. Those answer Access-Control-Allow-Origin: *.
 *
 * Everything else writes, and there is no auth middleware on this API, so the
 * allowlist stays: a failed preflight means a cross-site page can never get a
 * create/edit/delete request sent from a visitor's browser at all.
 */
function corsOptionsFor(req, callback) {
  const isRead =
    req.method === 'GET' ||
    (req.method === 'OPTIONS' && req.headers['access-control-request-method'] === 'GET');

  if (isRead) {
    // No credentials here: the spec forbids pairing them with origin '*'.
    return callback(null, { origin: '*', methods: 'GET, OPTIONS' });
  }

  callback(null, {
    origin: function (origin, cb) {
      // No Origin header at all: curl, server-to-server, same-origin.
      if (!origin) return cb(null, true);
      cb(null, ALLOWED_ORIGINS.includes(origin) || LOCALHOST.test(origin));
    },
    methods: 'GET, POST, PUT , DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // If you're using cookies or authentication
  });
}

var app = express();
app.use(cors(corsOptionsFor));


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
