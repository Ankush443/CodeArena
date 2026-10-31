const Room = require('../models/room');
const Message = require('../models/message');
const User = require('../models/user');

// Fetch all available rooms
exports.getRooms = async (req, res) => {
   try {
        // We find rooms where the user's ID exists in the 'users' array
        const rooms = await Room.find({ 
            users: req.result._id 
        }).populate('createdBy', 'firstName');
        
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new room and automatically join it
exports.createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        const newRoom = new Room({
            name,
            createdBy: req.result._id,
            users: [req.result._id]
        });
        await newRoom.save();
        
        // Update user's joined list
        await User.findByIdAndUpdate(req.result._id, { $addToSet: { joinedRooms: newRoom._id } });
        
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Join an existing room
exports.joinRoom = async (req, res) => {
   try {
        const roomId = req.body.roomId; // Get ID from body instead of params for cleaner UX
        
        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Room not found" });

        // Add user to the room's users list
        await Room.findByIdAndUpdate(roomId, { 
            $addToSet: { users: req.result._id } 
        });

        // Add room to the user's joinedRooms list
        await User.findByIdAndUpdate(req.result._id, { 
            $addToSet: { joinedRooms: roomId } 
        });

        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ message: "Invalid Room ID" });
    }
};

// Get messages for a specific room
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ roomId: req.params.id })
            .sort({ createdAt: 1 })
            .limit(50);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};