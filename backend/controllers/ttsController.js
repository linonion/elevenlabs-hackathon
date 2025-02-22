const elevenLabsService = require('../services/elevenLabsService');

exports.getTTS = async (req, res) => {
  try {
    const { voiceId, text } = req.body;
    if (!voiceId || !text) {
      return res.status(400).json({
        success: false,
        message: 'Missing voiceId or text.',
      });
    }

    const audioBuffer = await elevenLabsService.textToSpeech(voiceId, text);

    res.setHeader('Content-Type', 'audio/mpeg');
    return res.send(audioBuffer);

  } catch (err) {
    console.error('Error in getTTS:', err);
    return res.status(500).json({ success: false, message: 'TTS generation failed.' });
  }
};
