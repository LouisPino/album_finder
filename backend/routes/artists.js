var express = require('express');
var router = express.Router();
const artistCtrl = require("../controllers/artists")

/* GET users listing. */
router.get('/', artistCtrl.index)
// Must stay above /:artist — otherwise "albums" is read as an artist name.
router.get('/albums', artistCtrl.findByArtists);
router.get('/:artist', artistCtrl.findByArtist);
module.exports = router;