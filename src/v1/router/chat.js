const router=require('express').Router()
const chatCtrl=require('../controller/chat')


router.post('/chatCreate',chatCtrl.chatCreate)


module.exports=router