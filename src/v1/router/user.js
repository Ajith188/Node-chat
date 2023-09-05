const express = require("express");
const ctrl = require("../controller/user");
const router = express.Router();
const verifytoken = require('../common/lib')



router.post('/register',ctrl.register)
router.post('/login',ctrl.login)

module.exports=router