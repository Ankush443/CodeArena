const express = require('express');
const router = express.Router();
const { getNote, upsertNote } = require('../controllers/notesController');
const userMiddleware = require('../middleware/userMiddleware');

router.get('/:problemId', userMiddleware, getNote);
router.patch('/', userMiddleware, upsertNote);

module.exports = router;