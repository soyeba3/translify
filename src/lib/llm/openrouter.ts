import { LLMProvider, TranslateRequest, TranslateResponse } from "./types";

export class OpenRouterProvider implements LLMProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "";
    if (!this.apiKey) {
      throw new Error(
        "OPENROUTER_API_KEY is not defined in environment variables",
      );
    }
  }

  async translate(
    request: TranslateRequest & { modelId?: string },
  ): Promise<TranslateResponse> {
    const {
      text,
      sourceLanguage,
      targetLanguage,
      modelId = "google/gemini-2.0-flash-001",
    } = request;

    const sourceLangName = sourceLanguage === "bn" ? "Bangla" : "English";
    const targetLangName = targetLanguage === "bn" ? "Bangla" : "English";

    const systemPrompt = `You are a professional translation engine. Your task is to translate precisely between Bangla and English.
- If the input is in Bangla (either in native Bangla script or phonetically written in Latin characters, often called Banglish), translate it into clear, natural English.
- If the input is in English, translate it into natural Bangla script.
- Return ONLY the translated text. Do not include any explanations, greetings, or notes.
- Strictly adhere to the translation only rule.`;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
            "X-Title": "Translify",
          },
          body: JSON.stringify({
            model: modelId,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `Text: ${text}` },
            ],
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "OpenRouter API error");
      }

      const translatedText = data.choices[0].message.content.trim();
      return { translatedText };
    } catch (error: any) {
      console.error("OpenRouter API Error:", error);
      return {
        translatedText: "",
        error: error.message || "Failed to translate with OpenRouter",
      };
    }
  }
}
