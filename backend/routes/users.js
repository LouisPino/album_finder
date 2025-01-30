var express = require('express');
var router = express.Router();


const userCtrl = require("../controllers/users")

router.post('/', userCtrl.signIn);
router.put('/:id', userCtrl.updateUser);
router.get('/:id', userCtrl.getUserById);
module.exports = router;