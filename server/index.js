const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const messageRoute = require('./routes/messagesRoute')
const socket = require('socket.io')

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoute)

app.get('/', (req, res)=> {
    res.send("hello guys")
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB Connected successfully")
}).catch((err)=>{
    console.log(err.message)
})

const server = app.listen(process.env.PORT || 3001, ()=> {
    console.log(`server satrted on port ${process.env.PORT}`);
    
})

const io = socket(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
})

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    }) 

    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }
    })
})
