require('dotenv').config();

const express = require('express');
const cors = require('cors');
const voiceCloneRoutes = require('./routes/voiceCloneRoutes.js');
const ttsRoutes = require('./routes/ttsRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', voiceCloneRoutes);
app.use('/api', ttsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
