const mongoose=require('mongoose')
const express=require('express')
const fs=require('fs')
const cors=require('cors')
const config=require('./config.json')
const exp = require('constants')
const path=require('path')


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

// const{Server}=require('socket.io')
// var users=0
// const io = require("socket.io")(server)
// io.on("connection", (socket) => {
//   console.log("Connected to socket.io")

    // setTimeout(function(){
      // socket.send("Send Message")

      // socket.emit('myCustomEvent',{descrpition:"A Custom message from server side"})//// side server side 

      // socket.on("myCustomerEventClientSide",function(data){
      //   console.log(data)
      // }) ////////////****this is for client key used get the data show it ..


/////// broadcast used that how many used for this localhost connection
   //3. users++;
    // 3. io.sockets.emit('broadcast',{message:users +'users connected'}) ///this how many broadcast used the get show it count
    //4. users++;
    // socket.emit('NewUserConnected',{message:"Hi welcome node chat"})

    // socket.broadcast.emit('NewUserConnected',{message: users + "users connected...!"})
    // io.sockets.emit('');
    
    // }
    // ); ///////////////first socket after excuted this sec aftr this message show it 

////////**********broadcast created how to use that  */
    // io.emit("TestEvent","Tester Event call")

////////**********broadcast created how to use that  */

    // socket.on("disconnect", () => {
    // console.log("Socket DISCONNECTED")
    //3. users--;
    //3. io.sockets.emit('broadcast',{message:users +'users connected'})
    //4. users--;
    // socket.broadcast.emit('NewUserConnected',users +"user connected......!")
//   }) 
// })







//////////*********Namescape created ---variable show that after used for all values */
// const io = require("socket.io")(server)


// var cnsp=io.of('/custom-namespace')

// cnsp.on('connection',function(socket){
//   console.log("A user connected");

//   cnsp.emit('customerEvent',"tester Event Chat-Node")

//   socket.on('disconnect',function(){
//     console.log('A User Disconnected')
//   })
// })

//////////*********Namescape created ---variable show that after used for all values */





//////How to created to Room ***********////////

// const io = require("socket.io")(server)
//   var roomno =1

//   var fullno=0 /////used for multiple room used 
// io.on('connection',function(socket){
//   console.log("Socket connected")

// socket.join("roomno"+roomno)

// io.sockets.in("roomno"+roomno).emit("ConnectionRoom","Yow are connected to room no...."+roomno)

// fullno++
// if(fullno>=2){
//   fullno=0
//   roomno++
// }

//   socket.on('disconnect',()=>{
//     console.log("Socket Disconnected")
//   })
// })

//////How to created to Room ***********////////


const io= require('socket.io')(server)

// io.on('connection',(socket)=>{
//   console.log("Socket Connect...!")

//   socket.on('disconnect',()=>{
// console.log("Socket Disconnected")
//   })
// })
