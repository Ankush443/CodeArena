const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    isGeneral: { type: Boolean, default: false }, // To identify the default room
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('room', roomSchema);