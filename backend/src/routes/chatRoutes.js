const express = require('express');
const router = express.Router();
const { getRooms, createRoom, joinRoom, getMessages } = require('../controllers/chatController');
const userMiddleware = require('../middleware/userMiddleware');

router.get('/rooms', userMiddleware, getRooms);
router.post('/rooms', userMiddleware, createRoom);
// router.post('/rooms/:id/join', userMiddleware, joinRoom);
router.post('/rooms/join', userMiddleware, joinRoom); // Changed from /rooms/:id/join
router.get('/rooms/:id/messages', userMiddleware, getMessages);

module.exports = router;