var express = require('express');
var router = express.Router();
const artistCtrl = require("../controllers/artists")

/* GET users listing. */
router.get('/', artistCtrl.index)

module.exports = router;