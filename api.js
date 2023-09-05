const mongoose=require('mongoose')
const express=require('express')
const fs=require('fs')
const cors=require('cors')
const config=require('./config.json')
const exp = require('constants')
const path=require('path')
const chatMessage=require('./src/v1/model/chat')

const app=express()
app.use(cors())
app.use(express())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
     var options={
      root:path.join(__dirname)
     }
     var filename="index1.html"
   res.sendFile(filename,options)
})

let versions=['v1']
for(let v of versions){
    let p=__dirname+'/src/'+v+'/router/'
    fs.readdirSync(p).forEach((file)=>{
        if(file.includes('js')){
            let fn = file.replace('.js','')
            app.use('/'+v+'/'+fn, require(p+fn))
        }
    })
}

mongoose.connect(config.URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Connection to MongoDB failed:', err)
  })

  const server = app.listen(
    config.PORT,
    console.log("Server running on PORT "+config.PORT)
  );


const io= require('socket.io')(server)

io.on('connection', function(socket){
  console.log("socket_id",socket.id)
  console.log('a user connected');
  socket.on('joined', function(data) {
      console.log("joined",data)
      // socket.emit('acknowledge', 'Acknowledged')
  });
  socket.on('chat message',async function(msg){
      console.log('chat-message: ' + msg)
      const senderUsername = 'senderUsername'
      const chatMessag = await chatMessage.chat.create({
        username: senderUsername,
        message: msg,
      })
      try {
        await chatMessag.save(); // Save the message to MongoDB
        console.log('Message saved to MongoDB')
      } catch (error) {
        console.error('Error saving message to MongoDB:', error)
      }
      socket.emit('response message', msg + '  from NodeServer')
      socket.broadcast.emit('response message', msg + '  from NodeServer')
  })
})