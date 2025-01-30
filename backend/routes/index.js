var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express album finder' });
});


router.get('/oauth', async (req, res) => {
  // Extract the code from the query parameters
  const code = req.query.code;

  // Use this code to exchange it for an access token
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Now you can use the tokens to make authenticated API requests
    res.redirect('/albums'); // Redirect user to the dashboard or wherever you want
  } catch (error) {
    console.error('Error during OAuth authentication:', error);
    res.status(500).send('Authentication failed');
  }
});


module.exports = router;
