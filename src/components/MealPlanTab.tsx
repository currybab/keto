import { DAYS } from "../data/days";
import { isDetailedMeal, type Macros, type MealMode } from "../types";
import { MacroBar } from "./MacroBar";
import { MealCard } from "./MealCard";
import { MealModeToggle } from "./MealModeToggle";

interface MealPlanTabProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  expandedRecipe: string | null;
  onToggleRecipe: (key: string) => void;
  mealMode: MealMode;
  onChangeMealMode: (mode: MealMode) => void;
}

const ZERO_MACROS: Macros = { cal: 0, carb: 0, fat: 0, protein: 0 };

export function MealPlanTab({
  selectedDay,
  onSelectDay,
  expandedRecipe,
  onToggleRecipe,
  mealMode,
  onChangeMealMode,
}: MealPlanTabProps) {
  const currentDay = DAYS[selectedDay];
  const showBreakfast = mealMode === "three";

  const consideredMeals = showBreakfast
    ? [currentDay.meals.breakfast, currentDay.meals.lunch, currentDay.meals.dinner]
    : [currentDay.meals.lunch, currentDay.meals.dinner];

  const totalMacros = consideredMeals.filter(isDetailedMeal).reduce<Macros>(
    (acc, m) => ({
      cal: acc.cal + m.macros.cal,
      carb: acc.carb + m.macros.carb,
      fat: acc.fat + m.macros.fat,
      protein: acc.protein + m.macros.protein,
    }),
    ZERO_MACROS,
  );

  const summaryLabel = showBreakfast ? "하루 총합 (간식 제외)" : "두 끼 총합 (점심+저녁)";

  return (
    <>
      <MealModeToggle mode={mealMode} onChange={onChangeMealMode} />

      {/* Day Selector */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, overflowX: "auto" }}>
        {DAYS.map((d, i) => (
          <button
            key={i}
            onClick={() => onSelectDay(i)}
            style={{
              flex: 1,
              minWidth: 52,
              padding: "10px 4px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "all 0.2s",
              background: selectedDay === i ? "#4ade80" : "#111",
              color: selectedDay === i ? "#000" : "#888",
            }}
          >
            <div style={{ fontSize: 17, marginBottom: 2 }}>{d.emoji}</div>
            <div style={{ fontSize: 12, fontWeight: selectedDay === i ? 700 : 500 }}>{d.day.slice(0, 1)}</div>
          </button>
        ))}
      </div>

      {/* Daily Summary */}
      <div style={{ padding: 16, background: "#111", borderRadius: 10, marginBottom: 16, border: "1px solid #222" }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "#e8e8e8" }}>
          {currentDay.emoji} {currentDay.day} {summaryLabel}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <MacroBar label="칼로리" value={totalMacros.cal} unit="kcal" max={2500} color="#e8e8e8" />
          <MacroBar label="탄수화물" value={totalMacros.carb} unit="g" max={50} color="#4ade80" />
          <MacroBar label="지방" value={totalMacros.fat} unit="g" max={200} color="#fbbf24" />
          <MacroBar label="단백질" value={totalMacros.protein} unit="g" max={200} color="#60a5fa" />
        </div>
      </div>

      {/* Meals */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {showBreakfast && (
          <MealCard
            meal={currentDay.meals.breakfast}
            mealLabel="아침"
            recipeKey={`${selectedDay}-breakfast`}
            expandedRecipe={expandedRecipe}
            onToggleRecipe={onToggleRecipe}
          />
        )}
        <MealCard
          meal={currentDay.meals.lunch}
          mealLabel="점심"
          recipeKey={`${selectedDay}-lunch`}
          expandedRecipe={expandedRecipe}
          onToggleRecipe={onToggleRecipe}
        />
        <MealCard
          meal={currentDay.meals.dinner}
          mealLabel="저녁"
          recipeKey={`${selectedDay}-dinner`}
          expandedRecipe={expandedRecipe}
          onToggleRecipe={onToggleRecipe}
        />
        <MealCard
          meal={currentDay.meals.snack}
          mealLabel="간식"
          recipeKey={`${selectedDay}-snack`}
          expandedRecipe={expandedRecipe}
          onToggleRecipe={onToggleRecipe}
        />
      </div>
    </>
  );
}
