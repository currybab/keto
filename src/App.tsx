import { useState } from "react";
import type { MealMode, TabKey } from "./types";
import { TabBar } from "./components/TabBar";
import { MealPlanTab } from "./components/MealPlanTab";
import { DeliveryGuide } from "./components/DeliveryGuide";
import { EatOutGuide } from "./components/EatOutGuide";

export default function KetoMealPlan() {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TabKey>("plan");
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [mealMode, setMealMode] = useState<MealMode>("two");

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setExpandedRecipe(null);
  };

  const handleToggleRecipe = (key: string) => {
    setExpandedRecipe((prev) => (prev === key ? null : key));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0f0f0", fontFamily: "'Pretendard', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px 16px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#4ade80", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
            LOW CARB · HIGH FAT
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>저탄고지 1주일 식단</h1>
          <p style={{ fontSize: 13, color: "#666", marginTop: 6 }}>배달·외식 포함 현실적인 키토 플랜</p>
        </div>

        <TabBar activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "plan" && (
          <MealPlanTab
            selectedDay={selectedDay}
            onSelectDay={handleSelectDay}
            expandedRecipe={expandedRecipe}
            onToggleRecipe={handleToggleRecipe}
            mealMode={mealMode}
            onChangeMealMode={setMealMode}
          />
        )}
        {activeTab === "delivery" && <DeliveryGuide />}
        {activeTab === "eatout" && <EatOutGuide />}

        <div
          style={{
            marginTop: 24,
            padding: 14,
            background: "#0f0f0f",
            borderRadius: 10,
            border: "1px solid #1a1a1a",
            fontSize: 12,
            color: "#555",
            lineHeight: 1.6,
            textAlign: "center",
          }}
        >
          매크로 수치는 대략적인 참고값입니다.<br />개인 체질·활동량에 따라 조절하세요.
        </div>
      </div>
    </div>
  );
}
