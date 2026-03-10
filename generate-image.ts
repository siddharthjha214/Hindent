import { loadEnv } from 'vite';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

async function generate() {
  const env = loadEnv('development', process.cwd(), '');
  const apiKey = env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('No API key found in Vite env!');
    return;
  }

  console.log('Generating premium quality image...');
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: 'A photorealistic, high-quality, premium industrial machinery and precision engineering setup. Dark theme, dramatic lighting, sleek metal, glowing accents. No text, no logos.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync('public/generated-premium-quality.png', Buffer.from(base64Data, 'base64'));
        console.log('Image generated successfully.');
      }
    }
  } catch (e) {
    console.error('Failed to generate image:', e);
  }
}

generate();
