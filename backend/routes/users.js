var express = require('express');
var router = express.Router();


const userCtrl = require("../controllers/users")

router.post('/', userCtrl.signIn);
module.exports = router;