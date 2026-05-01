import type { MealMode } from "../types";

interface MealModeToggleProps {
  mode: MealMode;
  onChange: (mode: MealMode) => void;
}

const MODES: { key: MealMode; label: string }[] = [
  { key: "three", label: "🍽 3끼" },
  { key: "two", label: "⏰ 2끼+간식" },
];

export function MealModeToggle({ mode, onChange }: MealModeToggleProps) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#0f0f0f", borderRadius: 8, padding: 3, border: "1px solid #1a1a1a" }}>
      {MODES.map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          style={{
            flex: 1,
            padding: "7px 0",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            background: mode === m.key ? "#1a1a1a" : "transparent",
            color: mode === m.key ? "#4ade80" : "#666",
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
