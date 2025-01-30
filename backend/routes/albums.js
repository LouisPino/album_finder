var express = require('express');
var router = express.Router();
var cors = require('cors')

const albumCtrl = require("../controllers/albums")

/* GET users listing. */
router.get('/', cors(), albumCtrl.index)
router.get('/:email', albumCtrl.getAlbumsByEmail)
router.get('/saved/:id', albumCtrl.getUserSavedAlbumsById)
router.get('/id/:id', albumCtrl.getAlbumById)

router.put('/edit/:id', cors(), albumCtrl.editAlbum)

router.delete('/:id', cors(), albumCtrl.deleteAlbumById)


router.post('/create', albumCtrl.create)

module.exports = router;