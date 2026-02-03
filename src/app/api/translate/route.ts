import { getProvider } from "@/lib/llm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, modelId = "gemini" } = body;

    // 1. Basic Validation
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required and must be a string" },
        { status: 400 },
      );
    }

    if (text.length > 1000) {
      return NextResponse.json(
        { error: "Text exceeds maximum length of 1000 characters" },
        { status: 400 },
      );
    }

    // 2. Translate using LLM abstraction
    const provider = getProvider(modelId);
    const result = await (provider as any).translate({
      text,
      modelId,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      translatedText: result.translatedText,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
