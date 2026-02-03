import { GoogleGenerativeAI } from "@google/generative-ai";
import { LLMProvider, TranslateRequest, TranslateResponse } from "./types";

export class GeminiProvider implements LLMProvider {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async translate(
    request: TranslateRequest & { modelId?: string },
  ): Promise<TranslateResponse> {
    const {
      text,
      sourceLanguage,
      targetLanguage,
      modelId = "gemini-1.5-flash",
    } = request;

    // Create model instance dynamically based on requested modelId
    const model = this.genAI.getGenerativeModel({ model: modelId });

    const sourceLangName = sourceLanguage === "bn" ? "Bangla" : "English";
    const targetLangName = targetLanguage === "bn" ? "Bangla" : "English";

    const systemPrompt = `You are a professional translation engine. Your task is to translate precisely between Bangla and English.
- If the input is in Bangla (either in native Bangla script or phonetically written in Latin characters, often called Banglish), translate it into clear, natural English.
- If the input is in English, translate it into natural Bangla script.
- Return ONLY the translated text. Do not include any explanations, greetings, or notes.
- Strictly adhere to the translation only rule.`;

    try {
      const result = await model.generateContent([
        { text: systemPrompt },
        { text: `Text: ${text}` },
      ]);
      const response = await result.response;
      const translatedText = response.text().trim();

      if (!translatedText) {
        throw new Error("Empty response from Gemini");
      }

      return { translatedText };
    } catch (error: any) {
      console.error("Gemini API Error:", error);

      let errorMessage = "Failed to translate with Gemini";

      if (error.message?.includes("404")) {
        errorMessage =
          "Model not found or API version mismatch. Please check your project's Gemini API access.";
      } else if (error.message?.includes("403")) {
        errorMessage =
          "API key permission denied. Please verify your GEMINI_API_KEY.";
      } else if (error.message?.includes("429")) {
        errorMessage = "Rate limit exceeded. Please wait a moment.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        translatedText: "",
        error: errorMessage,
      };
    }
  }
}
