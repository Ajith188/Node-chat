const mongoose=require('mongoose')

const chatSchema=mongoose.Schema({
    // members:Array,
    // chatName: { type: String },
    username: String, // Add the sender's username
    message: String,
},
{
    timestamps:true,
})


const chat=mongoose.model('Chat',chatSchema)

module.exports={
    chat
}