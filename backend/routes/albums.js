var express = require('express');
var router = express.Router();
const albumCtrl = require("../controllers/albums")

/* GET users listing. */
router.get('/', albumCtrl.index)
router.delete('/:id', albumCtrl.deleteAlbumById)
router.get('/:email', albumCtrl.getAlbumsByEmail)


router.post('/create', albumCtrl.create)

module.exports = router;