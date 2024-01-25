const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);
const bodyParser= require("body-parser")
const mongoose=require("mongoose");
const userRoute =require('../Cadence/src/Routes/user')
const {Router} =require("express");
// const {  Login } = require("../pages/Login");
// const {  Signup } = require("../pages/Signup");
// const mongoose = require("mongoose");
// const User = require("../backend/database");

mongoose.connect('mongodb://127.0.0.1:27017/sample')
.then(()=>console.log("MongoDb connected"))
.catch((err)=> console.log("MongoDb error",err));

// app.use("/user", userRoute);
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

const userSchema =new mongoose.Schema({
    fullName:{
        type : String,
        required : true,
    },
    email:{
        type:String,
        required:true,
        unique : true,
    },
   
    password:{
        type:String,
        required:true,
        
    },
})

const User =new mongoose.model("user",userSchema)

app.post("/signup",async(req,res)=>{

    const user= await User.create(req.body);

    res.status(200).json({
        success:true,
        user
    })


})

// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Login route
app.post('/login', async (req, res) => {

const { email, password } = req.body;

try {
  // Check if user exists
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check password
//   const isMatch = await bcrypt.compare(password, user.password);
  if (password!==user.password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ name:user.fullName,email:user.email }, 'secretkey');

  console.log("succes",token);
  return res.status(200).json({ message: 'succes' ,token});
  

  
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
});


const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
      socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
      io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

    socket.on('disconnecting', () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
          socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
              socketId: socket.id,
              username: userSocketMap[socket.id],
          });
      });
      delete userSocketMap[socket.id];
      socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
