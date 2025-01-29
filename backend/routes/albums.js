var express = require('express');
var router = express.Router();
const albumCtrl = require("../controllers/albums")

/* GET users listing. */
router.get('/', albumCtrl.index)
router.get('/:email', albumCtrl.getAlbumsByEmail)
router.get('/id/:id', albumCtrl.getAlbumById)
router.put('/edit/:id', albumCtrl.editAlbum)
router.delete('/:id', albumCtrl.deleteAlbumById)


router.post('/create', albumCtrl.create)

module.exports = router;