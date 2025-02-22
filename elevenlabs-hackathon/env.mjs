import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    ELEVENLABS_API_KEY: z.string().min(1, 'elevenlabs api key').optional(),
  },
  client: {},
  runtimeEnv: {
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
  },
});

// const client = new ElevenLabsClient({
//   apiKey: 'sk_c10579bbbb0114f5ca5a9dd77317c70cc72cd492399b7ecc',
// });