var express = require('express');
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET
const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID, clientSecret: CLIENT_SECRET, redirectUri: `postmessage`
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express album finder' });
});


router.get('/oauth', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
    res.redirect('/albums');
  }
  catch (error) {
    console.error('Error during OAuth authentication:', error);
    res.status(500).send('Authentication failed');
  }
});


module.exports = router;
