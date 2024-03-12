const express=require('express');
const dotenv=require("dotenv")
const chats = require('./data/data');
const connectDB = require('./config/db');
import path from "path"
const colors=require("colors")
const userRoutes=require('./routes/userRoutes')
const messageRoutes=require("./routes/messageRoutes")
const chatRoutes=require('./routes/chatRoutes')
const {errorHandler,notFound}=require("./middlewares/errorMiddleware")
// d
const __dirname=path.resolve();
dotenv.config();
connectDB();
const app=express();

app.use(express.json()) //to accept json data

app.get('/',(req,res)=>{
  res.send("api is running")
})

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound)
app.use(errorHandler)


const PORT=process.env.PORT || 5000

//d
app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})
const server=app.listen(PORT,console.log(`server at ${PORT}`.yellow.bold))

const io=require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000"
  }
})

io.on("connection",(socket)=>{
 console.log("connected to socket.io")

 socket.on("setup",(userData)=>{
  socket.join(userData._id);
  // console.log(userData._id)
  socket.emit("connected")
 });

 socket.on("join chat",(room)=>{
  socket.join(room);
  console.log("user joined room :" +room);
 })

  socket.on("typing",(room)=>socket.in(room).emit("typing"))

  socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))

 socket.on("new message", (newMessageRecieved) => {
  var chat = newMessageRecieved.chat;

  if (!chat.users) return console.log("chat.users not defined");

  chat.users.forEach((user) => {
    if (user._id == newMessageRecieved.sender._id) return;

    socket.in(user._id).emit("message recieved", newMessageRecieved);
  });
});
socket.off("setup",()=>{
  console.log("USER DISCONNECTED");
  socket.leave(userData._id);
})
})

