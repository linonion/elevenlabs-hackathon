# LullAi - Personalized Audiobooks for kids

LullAi is a website project designed for busy parents who want to stay connected with their children through the magic of storytelling. It allows the user to create personalized audiobooks by simply inputting their story text and recording the voice.

This is an **eleven labs hackathon** project that uses [Eleven Labs API](https://beta.elevenlabs.io/) for voice cloning and text-to-speech, featuring a **easy to use for both parents and kids** front-end built with Next.js.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Possible Improvements](#possible-improvements)
- [Author](#author)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

1. **Voice Cloning**  
   - Allows user to upload an audio sample (`.mp3`, `.wav`).  
   - Calls Eleven Labs voice-add endpoint to create a unique `voiceId`.

2. **Text-to-Speech**  
   - Accepts the `voiceId` plus user-input text.  
   - Streams or returns an audio file (`audio/mpeg`) that can be played in the browser.

3. **Cute and easy hands-on User Interface**  
   - Cozy pastel color scheme
   - A reading area where text can be typed or loaded, then voiced out.
   - An easy hands-on voice modification and download function.


## Tech Stack

- **Front-end**
  - **Next.js + Tailwind CSS** for the React-based SPA + SSR.

- **Back-end**
  - **Node.js + Express** server (or integrated Next.js API routes).
  - `multer` for file uploads, `axios` for calling Eleven Labs, `cors` for cross-origin
  - `.env` to store `ELEVENLABS_API_KEY`.

- **Eleven Labs API**
  - Uses Voice Cloning endpoint (`/v1/voices/add`)
  - Uses TTS endpoint (`/v1/text-to-speech/{voiceId}`)


## Installation & Setup on your end

1. **Clone the repo**

2. **Install the dependencies**
```bash
    cd backend
    npm install
    cd ../front
    npm install
```
3. **Create your .env in the backend**
```bash
    ELEVENLABS_API_KEY=sk-xxxxxx
```
you might need to upgrade elevenlabs subscription, please check [Eleven Labs API](https://beta.elevenlabs.io/) for more inforamtion.

4. **Run both frontend and backend server**

```bash
cd backend
npm start
```

```bash
cd frontend
npm run dev
```

Usually listening on http://localhost:3000.


## Possible Improvements

- **Database:** MongoDB for managing user data, book selections, and voice profiles.
- **Security:** AWS S3 for securely storing user voice samples and generated audio files.
- **Character-level alignment:** Use streaming endpoint to highlight text as audio plays.
- **Interactive dictionary:** Clicking words for definitions/ pictures.
- **User accounts:** Let users store multiple voices.

If you have any issues, ideas or feedback, please feel free to create a new issue or contact the authors!


## Author
- [Yun Ma](https://github.com/yunma-code)
- [Jiayue Zhang](https://github.com/jiayuezhang84)
- [linonino](https://github.com/linonion)

## License
This project is licensed under the [MIT License](./LICENSE).

## Acknowlegements
- Eleven Labs for the voice cloning & TTS API.
- Tailwind CSS for quick styling.
- Our team for synergy in the hackathon.

---