const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config({ path: './backend/.env'});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
console.log('ELEVEN_LABS_API_KEY:', ELEVENLABS_API_KEY);

exports.createVoice = async (audioBuffer, filename) => {
  try {
    const form = new FormData();
    form.append('name', 'MyClonedVoice');
    form.append('files', audioBuffer, { filename });

    form.append('remove_background_noise', 'false');
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/voices/add',
      form,
      {
        headers: {

          'xi-api-key': ELEVENLABS_API_KEY,
          ...form.getHeaders()
        }
      }
    );

    const data = response.data;

    return {
      voiceId: data.voice_id,
      requiresVerification: data.requires_verification || false
    };

  } catch (err) {
    console.error('createVoice error:', err.response?.data || err.message);
    throw new Error('Failed to create voice from Eleven Labs');
  }
};

exports.textToSpeech = async (voiceId, text) => {
    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        { text },
        {
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'audio/mpeg'
          },
          responseType: 'arraybuffer'
        }
      );

      return Buffer.from(response.data);
    } catch (err) {
      console.error('textToSpeech error:', err.response?.data || err.message);
      throw new Error('Failed to generate TTS from Eleven Labs');
    }
  };

  // method for api call for voice settings
  exports.editVoiceSettings = async (voiceId, settings) => {
    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/voices/${voiceId}/settings/edit`,
        settings,
        {
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
  
      return response.data;
    } catch (err) {
      console.error('editVoiceSettings error:', err.response?.data || err.message);
      throw new Error('Failed to update voice settings');
    }
  };
  