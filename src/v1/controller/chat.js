const chatModel=require('../model/chat')


exports.chatCreate=async function(req,res){
    const chatName=await chatModel.chat.countDocuments({
        chatName:req.body.chatName
    })
    console.log(chatName)
    // return
    if(chatName==0){
        const result=await chatModel.chat.create({members:[req.body.firstId,req.body.secondId],chatName:req.body.chatName})
        if(result){
            res.send({status:1,message:"Created chat successfully",data:result})
        }else{
            res.send({status:0,message:""})
        }
    }else{
        res.send({status:0,message:"Already created chatName"})
    }
}