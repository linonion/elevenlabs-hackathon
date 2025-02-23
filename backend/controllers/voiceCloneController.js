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
