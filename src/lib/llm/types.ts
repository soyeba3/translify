export type Language = "bn" | "en";

export interface LLMModel {
  id: string;
  label: string;
  provider: "gemini" | "openai" | "claude" | "openrouter"; // Future proof
}

export interface TranslateRequest {
  text: string;
  sourceLanguage: Language;
  targetLanguage: Language;
}

export interface TranslateResponse {
  translatedText: string;
  error?: string;
}

export interface LLMProvider {
  translate(request: TranslateRequest): Promise<TranslateResponse>;
}
