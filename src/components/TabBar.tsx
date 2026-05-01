import type { TabKey } from "../types";

interface TabBarProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "plan", label: "식단표" },
  { key: "delivery", label: "배달 가이드" },
  { key: "eatout", label: "외식 가이드" },
];

export function TabBar({ activeTab, onChange }: TabBarProps) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#111", borderRadius: 8, padding: 3 }}>
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            flex: 1,
            padding: "8px 0",
            border: "none",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            background: activeTab === tab.key ? "#222" : "transparent",
            color: activeTab === tab.key ? "#f0f0f0" : "#666",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
