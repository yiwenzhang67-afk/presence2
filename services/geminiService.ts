import { GoogleGenAI } from "@google/genai";

export const generateDailyAffirmation = async (): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found");
      return "临在当下，此刻即是永恒。"; // Fallback text
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using a simpler model for text generation as per guidelines for basic text tasks
    const model = 'gemini-3-flash-preview'; 

    const prompt = `
      Based on a mindfulness essential oil blend named "Presence" (Critical ingredients: Vetiver, Lavender, Ylang Ylang, Frankincense, Clary Sage, Marjoram, Spearmint), 
      generate a single, short, poetic, and calming sentence in Chinese (Simplified) that serves as a "Daily Intention" or affirmation.
      The tone should be gentle, grounding, and non-judgmental. 
      Do not explain the oils. Just provide the sentence.
      Example vibe: "Let the roots of vetiver ground you in this moment." but in Chinese.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text ? response.text.trim() : "感受呼吸，回归本心。";
  } catch (error) {
    console.error("Error generating affirmation:", error);
    return "在每一次呼吸中，找到安宁。"; // Fallback on error
  }
};