import { EATOUT_TIPS } from "../data/tips";

export function EatOutGuide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ padding: 14, background: "#111", borderRadius: 10, border: "1px solid #222" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#8b5cf6", marginBottom: 8 }}>💡 외식 생존 전략</div>
        <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7 }}>
          ① 한식집은 고깃집이 킹, 쌈채소 무한이라 배부름<br />
          ② 술은 소주·위스키·하이볼 OK, 맥주는 탄수 폭탄<br />
          ③ "밥 빼주세요" 한마디면 대부분 해결<br />
          ④ 뷔페는 고기·해물 코너만 공략
        </div>
      </div>
      {EATOUT_TIPS.map((tip, i) => (
        <div key={i} style={{ padding: 14, background: "#111", borderRadius: 10, border: "1px solid #222" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{tip.place}</div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>✅ 먹어도 되는 것</span>
            <div style={{ fontSize: 13, color: "#aaa", marginTop: 4 }}>{tip.good}</div>
          </div>
          <div>
            <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 600 }}>❌ 피할 것</span>
            <div style={{ fontSize: 13, color: "#aaa", marginTop: 4 }}>{tip.avoid}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
