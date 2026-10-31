const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'room', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    senderName: { type: String }, // Storing name for quick UI display
    text: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('message', messageSchema);