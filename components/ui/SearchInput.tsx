"use client";

import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Buscar...",
  value: controlledValue,
  onChange,
  className = "",
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
        style={{ color: "var(--text-muted)" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border-primary)",
          color: "var(--text-primary)",
        }}
      />
      {value && (
        <button
          onClick={() => {
            setInternalValue("");
            onChange?.("");
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
