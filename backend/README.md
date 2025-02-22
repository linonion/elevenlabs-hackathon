# Backend: Node.js + Express + Eleven Labs Integration

This backend handles audio uploads and text requests from the frontend, interacts with the Eleven Labs API for voice cloning and text-to-speech (TTS), and returns the resulting audio for playback.

## Directory Structure Introduction
```bash
backend/
├── controllers/
│   ├── voiceCloneController.js      // Handles voice cloning logic
│   └── ttsController.js             // Handles text-to-speech logic
├── services/
│   └── elevenLabsService.js         // Encapsulates all Eleven Labs API calls
├── routes/
│   ├── voiceCloneRoutes.js          // /api/voice-clone route
│   └── ttsRoutes.js                 // /api/tts route
├── uploads/                         // Temporary directory for uploaded audio
├── .env                             // Environment variables
├── .gitignore                       // Specifies files/folders to ignore
├── package.json
├── package-lock.json
├── server.js                        // Express server entry point
└── README.md                        // This file
```

## Key Features

1. **Voice Cloning**
   - Receives an uploaded audio file and calls the Eleven Labs API to create or update a Voice ID.
   - Endpoint: `POST /api/voice-clone` (Multipart FormData upload).
   - Returns a `voiceId` that can be used for subsequent text-to-speech requests.

2. **Text-to-Speech (TTS)**
   - Receives a `voiceId` along with the text to be read aloud, calls Eleven Labs for synthesis, and returns an audio stream (audio/mpeg).
   - Endpoint: `POST /api/tts` (JSON request).
   - Useful for reading stories or user-provided text with a cloned voice.

## Installation & Setup

## Author
- **Jiayue Zhang**
- **Ling Liu**

