"use client";

import { Spinner } from "@/components/ui/spinner";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  loading,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm shadow-blue-500/20",
    secondary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-300 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? <Spinner className="mr-2" /> : null}
      {children}
    </button>
  );
}
