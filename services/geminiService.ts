import { GoogleGenAI, Type } from "@google/genai";
import { HoroscopeResult, CompatibilityResult, KundliResult } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

export const generateHoroscope = async (
  name: string,
  dob: string,
  pob: string
): Promise<HoroscopeResult> => {
  const prompt = `
    Act as a mystical and wise astrologer. Generate a horoscope for:
    Name: ${name}
    Date of Birth: ${dob}
    Place of Birth: ${pob}

    Return the response in STRICT JSON format with the following schema:
    {
      "daily": "A short, poetic daily horoscope prediction (max 3 sentences).",
      "personality": "A brief insight into their core personality based on the date.",
      "luckyNumber": "A single number.",
      "luckyColor": "A color name.",
      "mood": "Current cosmic mood (one word)."
    }
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          daily: { type: Type.STRING },
          personality: { type: Type.STRING },
          luckyNumber: { type: Type.STRING },
          luckyColor: { type: Type.STRING },
          mood: { type: Type.STRING },
        },
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from stars");
  return JSON.parse(text) as HoroscopeResult;
};

export const generateCompatibility = async (
  sign1: string,
  sign2: string
): Promise<CompatibilityResult> => {
  const prompt = `
    Analyze the compatibility between ${sign1} and ${sign2}.
    Return strictly JSON:
    {
      "percentage": number (0-100),
      "analysis": "2 sentence summary of the relationship dynamic.",
      "strengths": ["Point 1", "Point 2", "Point 3"],
      "challenges": ["Point 1", "Point 2"]
    }
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          percentage: { type: Type.NUMBER },
          analysis: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from stars");
  return JSON.parse(text) as CompatibilityResult;
};

export const generateKundli = async (
  name: string,
  dob: string,
  time: string,
  place: string
): Promise<KundliResult> => {
  const prompt = `
    Generate a simplified Janam Kundli (Birth Chart) summary for:
    Name: ${name}, DOB: ${dob}, Time: ${time}, Place: ${place}.
    
    Return strictly JSON:
    {
      "summary": "A mystical paragraph describing the planetary alignment at birth.",
      "dominantPlanet": "The name of the ruling planet.",
      "strength": "Their greatest cosmic strength.",
      "weakness": "A karmic challenge they face."
    }
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          dominantPlanet: { type: Type.STRING },
          strength: { type: Type.STRING },
          weakness: { type: Type.STRING },
        },
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from stars");
  return JSON.parse(text) as KundliResult;
};

export const chatWithAstrologer = async (
  history: { role: "user" | "model"; parts: [{ text: string }] }[],
  message: string
): Promise<string> => {
  const chat = ai.chats.create({
    model: MODEL_NAME,
    history: history,
    config: {
      systemInstruction:
        "You are a wise, empathetic, and mystical AI Astrologer named 'Astra'. You provide guidance based on astrological principles, Vastu, and cosmic energy. Keep answers concise, encouraging, and mysterious.",
    },
  });

  const result = await chat.sendMessage({ message });
  return result.text || "The stars are silent regarding this query.";
};