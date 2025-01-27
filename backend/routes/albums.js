var express = require('express');
var router = express.Router();
const albumCtrl = require("../controllers/albums")


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'ALBUMS' });
});


router.post('/albumcreate', albumCtrl.create)

module.exports = router;