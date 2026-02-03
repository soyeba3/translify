import { GeminiProvider } from "./gemini";
import { OpenRouterProvider } from "./openrouter";
import { LLMModel, LLMProvider } from "./types";

export const MODELS: LLMModel[] = [
  {
    id: "openai/gpt-oss-20b:free",
    label: "GPT OSS 20B (Free)",
    provider: "openrouter",
  },
  // {
  //   id: "openai/gpt-oss-120b:free",
  //   label: "GPT OSS 120B (Free)",
  //   provider: "openrouter",
  // },
  {
    id: "deepseek/deepseek-r1-0528:free",
    label: "DeepSeek R1 (Free)",
    provider: "openrouter",
  },
  {
    id: "z-ai/glm-4.5-air:free",
    label: "GLM 4.5 Air (Free)",
    provider: "openrouter",
  },
  {
    id: "qwen/qwen-2.5-72b-instruct",
    label: "Qwen 2.5 72B (OpenRouter)",
    provider: "openrouter",
  },
  {
    id: "google/gemini-2.0-flash-001",
    label: "Gemini 2.0 Flash (OpenRouter)",
    provider: "openrouter",
  },
  {
    id: "google/gemini-flash-1.5",
    label: "Gemini 1.5 Flash (OpenRouter)",
    provider: "openrouter",
  },
  {
    id: "gemini-2.0-flash",
    label: "Gemini 2.0 Flash (Native)",
    provider: "gemini",
  },
];

export function getProvider(modelId: string): LLMProvider {
  const model = MODELS.find((m) => m.id === modelId);

  if (!model) {
    throw new Error(`Model with id ${modelId} not found`);
  }

  switch (model.provider) {
    case "gemini":
      return new GeminiProvider();
    case "openrouter":
      return new OpenRouterProvider();
    default:
      throw new Error(`Provider for model ${modelId} is not implemented`);
  }
}
