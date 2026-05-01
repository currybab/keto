import type { Meal } from "../types";

interface MealCardProps {
  meal: Meal;
  mealLabel: string;
  recipeKey: string;
  expandedRecipe: string | null;
  onToggleRecipe: (key: string) => void;
}

export function MealCard({ meal, mealLabel, recipeKey, expandedRecipe, onToggleRecipe }: MealCardProps) {
  if (typeof meal === "string") {
    return (
      <div style={{ padding: "12px 16px", background: "#111", borderRadius: 10, border: "1px solid #222" }}>
        <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>간식</div>
        <div style={{ fontSize: 14, color: "#ccc" }}>{meal}</div>
      </div>
    );
  }

  const isExpanded = expandedRecipe === recipeKey;
  const tagBg = meal.isDelivery ? "#f59e0b15" : meal.isEatOut ? "#8b5cf615" : "transparent";
  const tagColor = meal.isDelivery ? "#f59e0b" : meal.isEatOut ? "#8b5cf6" : "transparent";
  const tagText = meal.isDelivery ? "배달" : meal.isEatOut ? "외식" : "";
  const borderColor = meal.isDelivery ? "#f59e0b22" : meal.isEatOut ? "#8b5cf622" : "#222";

  return (
    <div style={{ padding: 16, background: "#111", borderRadius: 10, border: `1px solid ${borderColor}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1 }}>{mealLabel}</div>
        {tagText && (
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: tagBg, color: tagColor, fontWeight: 600 }}>
            {tagText}
          </span>
        )}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#f0f0f0", marginBottom: 6 }}>{meal.name}</div>
      <div style={{ fontSize: 13, color: "#999", lineHeight: 1.5, marginBottom: 10 }}>{meal.desc}</div>
      <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#666" }}>
        <span>
          <span style={{ color: "#e8e8e8", fontWeight: 600 }}>{meal.macros.cal}</span> kcal
        </span>
        <span>탄 <span style={{ color: "#4ade80" }}>{meal.macros.carb}g</span></span>
        <span>지 <span style={{ color: "#fbbf24" }}>{meal.macros.fat}g</span></span>
        <span>단 <span style={{ color: "#60a5fa" }}>{meal.macros.protein}g</span></span>
      </div>
      {meal.recipe && (
        <>
          <button
            onClick={() => onToggleRecipe(recipeKey)}
            style={{
              marginTop: 10,
              padding: "6px 12px",
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 6,
              color: "#ccc",
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {isExpanded ? "레시피 닫기 ▲" : "레시피 보기 ▼"}
          </button>
          {isExpanded && (
            <div style={{ marginTop: 12, padding: 14, background: "#0a0a0a", borderRadius: 8, border: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600, marginBottom: 8 }}>재료</div>
              <div style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7, marginBottom: 12 }}>
                {meal.recipe.ingredients.join(" · ")}
              </div>
              <div style={{ fontSize: 12, color: "#60a5fa", fontWeight: 600, marginBottom: 8 }}>만드는 법</div>
              {meal.recipe.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: "#aaa", lineHeight: 1.5 }}>
                  <span style={{ color: "#60a5fa", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
