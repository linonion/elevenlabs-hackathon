const express = require('express');
const router = express.Router();
const { getTTS } = require('../controllers/ttsController');

router.post('/tts', getTTS); // name it as you want

module.exports = router;
