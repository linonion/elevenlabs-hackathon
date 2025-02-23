const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloneVoice, generateClonedVoice } = require('../controllers/voiceCloneController');

const upload = multer({ dest: 'uploads/' });
router.post('/voice-clone', upload.single('audio'), cloneVoice); 

// add router for cloned voice 
// router.post('/voice-clone/generate', upload.single('audio'), generateClonedVoice);

// get to fetch voice by id
router.get('/voice-clone/generate/:voiceId', generateClonedVoice);


module.exports = router;
