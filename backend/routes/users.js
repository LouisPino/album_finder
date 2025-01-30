var express = require('express');
var router = express.Router();
var cors = require('cors')


const userCtrl = require("../controllers/users")

router.post('/', userCtrl.signIn);
router.put('/:id', userCtrl.updateUser);
router.get('/:email', userCtrl.getUserByEmail);
module.exports = router;