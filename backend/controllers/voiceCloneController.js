const fs = require('fs');
const elevenLabsService = require('../services/elevenLabsService');

exports.cloneVoice = async (req, res) => {
  try {
    console.log('Request File:', req.file); //DEBUG
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No audio file uploaded.' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;

    const audioBuffer = fs.readFileSync(filePath);

    const responseData = await elevenLabsService.createVoice(audioBuffer, originalName);

    const { voiceId } = responseData;
    //delete after processing
    fs.unlinkSync(filePath);

    return res.json({
      success: true,
      voiceId,
    });

  } catch (err) {
    console.error('Error in cloneVoice:', err);
    return res.status(500).json({ success: false, message: 'Voice cloning failed.' });
  }
};

// add generate cloned voice endpoint 
exports.generateClonedVoice = async (req, res) => {
  try {
    const voiceId = req.params.voiceId;
    if (!voiceId) {
      return res.status(400).json({ success: false, message: 'No voiceId provided' });
    }

    const audioBuffer = await elevenLabsService.textToSpeech(voiceId, 'Hello, this is the cloned voice!');

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="cloned-voice.mp3"',
    });

    res.send(audioBuffer);
  } catch (error) {
    console.error('Error in generateClonedVoice:', error);
    res.status(500).json({ error: 'Failed to generate cloned voice' });
  }
};


