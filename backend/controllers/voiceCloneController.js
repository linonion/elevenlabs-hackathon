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

// edit cloned voice settings
exports.editClonedVoice = async (req, res) => {
  try {
    const voiceId = req.params.voiceId;
    const { name, description, removeBackgroundNoise, stability, similarityBoost } = req.body;

    if (!voiceId) {
      return res.status(400).json({ success: false, message: 'No voiceId provided' });
    }

    const settings = {
      name: name || 'Default Voice Name',
      description: description || 'Updated Voice Description',
      remove_background_noise: removeBackgroundNoise || false,
      stability: stability || 0.5,
      similarity_boost: similarityBoost || 0.5
    };

    const responseData = await elevenLabsService.editVoiceSettings(voiceId, settings);

    return res.json({
      success: true,
      message: 'Voice settings updated successfully',
      data: responseData
    });

  } catch (err) {
    console.error('Error in editClonedVoice:', err.response?.data || err.message);
    return res.status(500).json({ success: false, message: 'Failed to update voice settings' });
  }
};
