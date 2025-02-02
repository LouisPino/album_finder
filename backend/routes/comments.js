var express = require('express');
var router = express.Router();


const commentsCtrl = require("../controllers/comments")

router.get('/:id', commentsCtrl.getCommentsByAlbumId);
router.post('/', commentsCtrl.addComment);
router.delete('/:id', commentsCtrl.deleteComment);
module.exports = router;