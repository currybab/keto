import { DELIVERY_TIPS } from "../data/tips";

const CATEGORY_COLORS = [
  { bg: "#4ade8015", color: "#4ade80", border: "#4ade8022" },
  { bg: "#60a5fa15", color: "#60a5fa", border: "#60a5fa22" },
  { bg: "#fbbf2415", color: "#fbbf24", border: "#fbbf2422" },
  { bg: "#ef444415", color: "#ef4444", border: "#ef444422" },
];

export function DeliveryGuide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ padding: 14, background: "#111", borderRadius: 10, border: "1px solid #222" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#f59e0b", marginBottom: 8 }}>💡 배달 주문 핵심 룰</div>
        <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7 }}>
          ① 밥은 무조건 빼고 주문 (요청사항에 "밥 빼주세요")<br />
          ② 국물 있는 건 OK, 면/떡 사리는 NO<br />
          ③ 양념보다 구이/찜 위주로<br />
          ④ 모르겠으면 고기 + 쌈 조합이 정답
        </div>
      </div>
      {DELIVERY_TIPS.map((cat, i) => {
        const palette = CATEGORY_COLORS[i] ?? CATEGORY_COLORS[CATEGORY_COLORS.length - 1];
        return (
          <div key={i} style={{ padding: 14, background: "#111", borderRadius: 10, border: "1px solid #222" }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, color: "#e8e8e8" }}>{cat.category}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cat.items.map((item, j) => (
                <span
                  key={j}
                  style={{
                    fontSize: 12,
                    padding: "5px 10px",
                    borderRadius: 20,
                    background: palette.bg,
                    color: palette.color,
                    border: `1px solid ${palette.border}`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
