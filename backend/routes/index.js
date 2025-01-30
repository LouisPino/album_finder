var express = require('express');
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const BASE_URL = process.env.BASE_URL
const CLIENT_SECRET = process.env.CLIENT_SECRET
const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID, clientSecret: CLIENT_SECRET, redirectUri: `${BASE_URL}/oauth`
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express album finder' });
});


router.get('/oauth', async (req, res) => {
  // Extract the code from the query parameters
  const code = req.query.code;
  console.log("hit")
  console.log(code)
  // Use this code to exchange it for an access token
  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
    console.log(tokens)
    // Now you can use the tokens to make authenticated API requests
    res.redirect('/albums'); // Redirect user to the dashboard or wherever you want
  } catch (error) {
    console.error('Error during OAuth authentication:', error);
    res.status(500).send('Authentication failed');
  }
});


module.exports = router;
