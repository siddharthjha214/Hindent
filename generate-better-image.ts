import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

async function generate() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('No API key');
    return;
  }
  const ai = new GoogleGenAI({ apiKey });
  const prompt = "A hyper-realistic, 8k resolution, award-winning photography of premium industrial machinery and precision engineering components. Cinematic lighting, sleek polished metal, glowing subtle blue and orange accents, dark moody background, highly detailed, macro photography style, depth of field. No text, no logos.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "2K"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync('public/legacy-excellence.jpg', Buffer.from(base64Data, 'base64'));
        console.log('Image generated successfully.');
        break;
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

generate();
