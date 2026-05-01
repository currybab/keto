interface MacroBarProps {
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
}

export function MacroBar({ label, value, unit, max, color }: MacroBarProps) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: "#888", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: "'DM Mono', monospace" }}>
        {value}
        <span style={{ fontSize: 11, fontWeight: 400 }}>{unit}</span>
      </div>
      <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, marginTop: 4 }}>
        <div
          style={{
            height: "100%",
            width: `${Math.min((value / max) * 100, 100)}%`,
            background: color,
            borderRadius: 2,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}
