var express = require('express');
var router = express.Router();

const artistCtrl = require("../controllers/artists")

/* GET users listing. */
router.get('/', artistCtrl.index)
router.get('/:artist', artistCtrl.findByArtist);
module.exports = router;