const router=require('express').Router()
const messagCtrl=require('../controller/message')


router.post('/sendMessage',messagCtrl.SendMessage)

module.exports=router