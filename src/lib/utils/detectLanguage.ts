import { Language } from "../llm/types";

export function detectLanguage(text: string): Language | "unsupported" {
  if (text.length === 0) return "unsupported";

  let banglaChars = 0;
  let englishChars = 0;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // Bangla Unicode block: 0980 - 09FF
    if (code >= 0x0980 && code <= 0x09ff) {
      banglaChars++;
    } else if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      englishChars++;
    }
  }

  if (banglaChars > englishChars) {
    return "bn";
  }

  if (englishChars > banglaChars) {
    return "en";
  }

  // Simple fallback for numbers/symbols or equal counts
  // Default to english if some alphabets are found
  if (englishChars > 0 || banglaChars > 0) {
    return englishChars >= banglaChars ? "en" : "bn";
  }

  return "unsupported";
}
