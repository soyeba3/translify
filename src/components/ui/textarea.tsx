"use client";

import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label ? (
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </label>
      ) : null}
      <textarea
        className={`min-h-[160px] w-full resize-none rounded-2xl border border-zinc-200 bg-white p-4 text-base text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600 ${className}`}
        {...props}
      />
    </div>
  );
}
