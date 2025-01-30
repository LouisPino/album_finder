var express = require('express');
var router = express.Router();
var cors = require('cors')

const artistCtrl = require("../controllers/artists")

/* GET users listing. */
router.get('/', cors(), artistCtrl.index)
router.get('/:artist', artistCtrl.findByArtist);
module.exports = router;