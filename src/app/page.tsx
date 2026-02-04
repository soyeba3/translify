"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MODELS } from "@/lib/llm";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [modelId, setModelId] = useState(MODELS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Fallback or ignore
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim() || isOverLimit) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, modelId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Translation failed");
      }

      setOutputText(data.translatedText);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent submission if exceeds limit
  const isOverLimit = inputText.length > 1000;

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      <main className="flex flex-col px-6 py-12 mx-auto max-w-5xl md:py-24">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
            <span className="mr-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse dark:bg-blue-400" />
            AI-Powered Translation
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Translify
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Translate seamlessly between Bangla and English using AI.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-4 justify-between items-center pb-6 mb-8 border-b border-zinc-200 md:flex-row dark:border-zinc-800">
          <div className="flex flex-col gap-2 w-full md:w-64">
            <label className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
              Select Model
            </label>
            <Select
              options={MODELS}
              value={modelId}
              onChange={setModelId}
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleTranslate}
            loading={isLoading}
            disabled={!inputText.trim() || isOverLimit}
            className="w-full md:w-auto"
          >
            Translate Now
          </Button>
        </div>

        {/* Editor Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Input Side */}
          <div className="relative">
            <Textarea
              label="Input Text"
              placeholder="বাংলা অথবা ইংরেজিতে লিখুন..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              className={
                isOverLimit
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/5"
                  : ""
              }
            />
            <div
              className={`mt-2 text-right text-xs font-medium ${isOverLimit ? "text-red-500" : "text-zinc-500"}`}
            >
              {inputText.length} / 1000
            </div>
          </div>

          {/* Output Side */}
          <div className="relative">
            <Textarea
              label="Translation"
              placeholder="অনুবাদ এখানে প্রদর্শিত হবে..."
              value={outputText}
              readOnly
              className="bg-zinc-50/50 dark:bg-zinc-900/30"
            />
            {outputText && (
              <button
                onClick={handleCopy}
                className="absolute top-[38px] right-3 p-2 text-zinc-500 rounded-lg transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95"
                title="Copy to clipboard"
              >
                {isCopied ? (
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            )}
            {error && (
              <div className="flex gap-3 items-start p-4 mt-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400">
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="flex flex-col gap-6 items-start mt-16 text-sm text-zinc-500 md:flex-row md:justify-center md:items-center md:text-center md:gap-12">
          <div className="flex gap-2 items-center">
            <span className="flex justify-center items-center w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-800">
              1
            </span>
            Simple bangla-english only
          </div>
          <div className="flex gap-2 items-center">
            <span className="flex justify-center items-center w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-800">
              2
            </span>
            Max 1000 characters
          </div>
          <div className="flex gap-2 items-center">
            <span className="flex justify-center items-center w-5 h-5 rounded-md bg-zinc-100 dark:bg-zinc-800">
              3
            </span>
            Production grade AI translations
          </div>
        </div>
      </main>
    </div>
  );
}
