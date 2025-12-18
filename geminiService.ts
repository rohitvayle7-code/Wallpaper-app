
import { GoogleGenAI } from "@google/genai";
import { AspectRatio, GenerationParams } from "./types";

export const generateWallpaper = async (params: GenerationParams): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const fullPrompt = params.style 
    ? `A high-resolution, artistic wallpaper. Style: ${params.style}. Subject: ${params.prompt}. High detail, 8k resolution, cinematic lighting.`
    : `A breathtaking high-resolution wallpaper of ${params.prompt}. Professional photography, vibrant colors, stunning detail.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: params.aspectRatio,
        },
      },
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      throw new Error("No image was generated in the response.");
    }

    return imageUrl;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
