const messageModel=require('../model/message')
const {ObjectId}=require('mongodb')
const userModel=require('../model/user')
const chatModel=require('../model/chat')


exports. SendMessage=async function(req,res){
    const sender=req.body.sender
    const readBy=req.body.readBy
    const chat=req.body.chat
    if (!ObjectId.isValid(sender) || !ObjectId.isValid(readBy) ) {
        return res.status(400).json({ message: 'Invalid sender or readBy ID' })
    }

    const user = await userModel.userModel.findOne({
        $or: [
          { sender: sender },
          { readBy: readBy } // Add more conditions as needed
        ]
      })
      if (!ObjectId.isValid(chat) ) {
        return res.status(400).json({ message: 'Invalid chatID' })
    }
    const chatId=await chatModel.chat.findOne({chat:chat})
// console.log(chatId)
    const result=await messageModel.Message.create(req.body)
    if(result){
    res.send({status:1,message:"Send message",data:result})
    }else{
        res.send({status:0,message:""})
    }
}