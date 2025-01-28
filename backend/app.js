var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
require('./config/database.js')

const JWT_SECRET = process.env.JWT_SECRET;


var indexRouter = require('./routes/index');
var albumsRouter = require('./routes/albums');
var artistRouter = require('./routes/artists');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
}));



app.post('/google-auth', async (req, res) => {
  const { credential, client_id } = req.body;

  try {
    // Verify the ID token with Google's API
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();

    const { email, given_name, family_name } = payload;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if they don't exist
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        authSource: 'google',
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h', // Adjust expiration time as needed
    });

    // Send the token as a cookie and response
    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: false, // Set to true in production when using HTTPS
        maxAge: 3600000, // 1 hour in milliseconds
      })
      .json({ message: 'Authentication successful', user });
  } catch (err) {
    console.error('Error during Google Authentication:', err);
    res.status(400).json({ error: 'Authentication failed', details: err });
  }
});


app.use('/', indexRouter);
app.use('/albums', albumsRouter);
app.use('/artists', artistRouter);

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
