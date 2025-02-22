const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloneVoice } = require('../controllers/voiceCloneController');

const upload = multer({ dest: 'uploads/' });
router.post('/voice-clone', upload.single('audio'), cloneVoice); // name it as you want

module.exports = router;
