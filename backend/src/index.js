const { setServers } = require('node:dns/promises');

setServers(['1.1.1.1', '8.8.8.8']);



const express = require('express')
const http = require('http'); // 1. Added HTTP module
const { Server } = require('socket.io'); // 2. Added Socket.io
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")
const aiRouter = require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");
const cors = require('cors')
const Message = require('./models/message');
const Room = require('./models/room');
const router=require('./routes/notesRoutes')

// console.log("Hello")
const PORT=process.env.PORT || 3000;
const server = http.createServer(app); // 3. Create HTTP server
const io = new Server(server, {
    cors: {
        origin: 'https://codearena-frontend-7x6c.onrender.com',
        credentials: true
    }
});


app.use(cors({
    origin: 'https://codearena-frontend-7x6c.onrender.com',
    credentials: true 
}))
app.use(express.json());
app.use(cookieParser());

const chatRouter = require('./routes/chatRoutes');
app.use('/chat', chatRouter);


app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);
app.use("/notes",router)


// Socket.io Logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on('sendMessage', async (data) => {
        const { roomId, senderId, senderName, text } = data;
        
        // Save to MongoDB
        const newMessage = new Message({ roomId, senderId, senderName, text });
        await newMessage.save();

        // Broadcast to everyone in the room
        io.to(roomId).emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const InitalizeConnection = async ()=>{
    try {
        await Promise.all([main(), redisClient.connect()]);
        console.log("DB Connected");
        
        // IMPORTANT: Ensure a General room exists
        await Room.findOneAndUpdate(
            { name: "General" },
            { isGeneral: true },
            { upsert: true, new: true }
        );

        // 4. Change app.listen to server.listen
        server.listen(PORT, () => {
            console.log("Server listening at port: " + process.env.PORT);
        });
    } catch(err) {
        console.log("Error: " + err);
    }
}
InitalizeConnection();

