const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'problem', required: true },
    textContent: { type: String, default: "" },
    // Yeh sabse important hai tldraw ke liye
    drawingData: { 
        type: mongoose.Schema.Types.Mixed, 
        default: {} 
    }
}, { timestamps: true });

module.exports = mongoose.model('notes', notesSchema);