import { useState } from "react";

interface Macros {
  cal: number;
  carb: number;
  fat: number;
  protein: number;
}

interface Recipe {
  ingredients: string[];
  steps: string[];
}

interface DetailedMeal {
  name: string;
  desc: string;
  macros: Macros;
  recipe?: Recipe;
  isDelivery?: boolean;
  isEatOut?: boolean;
}

type Meal = DetailedMeal | string;

interface DayMeals {
  breakfast: DetailedMeal;
  lunch: DetailedMeal;
  dinner: DetailedMeal;
  snack: string;
}

interface Day {
  day: string;
  emoji: string;
  meals: DayMeals;
}

interface DeliveryTip {
  category: string;
  items: string[];
}

interface EatOutTip {
  place: string;
  good: string;
  avoid: string;
}

type TabKey = "plan" | "delivery" | "eatout";

const DAYS: Day[] = [
  {
    day: "월요일",
    emoji: "🥩",
    meals: {
      breakfast: {
        name: "버터 스크램블 + 아보카도",
        desc: "달걀 3개를 버터 1T에 스크램블, 아보카도 반 개, 슬라이스 치즈 1장",
        macros: { cal: 520, carb: 4, fat: 42, protein: 28 },
      },
      lunch: {
        name: "🏢 배달: 곱창볶음",
        desc: "곱창/막창 볶음 주문 (밥 빼고). 양배추쌈이 같이 오면 쌈 싸서. 볶음밥은 절대 시키지 마세요",
        macros: { cal: 580, carb: 8, fat: 38, protein: 35 },
        isDelivery: true,
      },
      dinner: {
        name: "연어 스테이크 + 버터 채소",
        desc: "연어 200g 올리브오일에 굽기. 브로콜리·버섯을 버터에 볶아서 곁들이기",
        macros: { cal: 550, carb: 5, fat: 38, protein: 40 },
        recipe: {
          ingredients: ["연어 200g", "올리브오일 1T", "브로콜리 1줌", "양송이버섯 4개", "버터 1T", "소금·후추"],
          steps: [
            "연어에 소금·후추 뿌려 10분 재우기",
            "팬에 올리브오일 두르고 중불에서 연어 앞뒤 4분씩",
            "다른 팬에 버터 녹이고 브로콜리·버섯 3분 볶기",
            "접시에 함께 담고 레몬즙 살짝 뿌리면 완성",
          ],
        },
      },
      snack: "아몬드 15알 + 스트링치즈 1개",
    },
  },
  {
    day: "화요일",
    emoji: "🥚",
    meals: {
      breakfast: {
        name: "키토 계란찜",
        desc: "달걀 3개 + 새우젓 약간 + 물 조금 → 전자레인지 3분. 참기름 살짝",
        macros: { cal: 280, carb: 2, fat: 18, protein: 24 },
      },
      lunch: {
        name: "🏢 배달: 순두부찌개 (밥X)",
        desc: "해물 or 고기 순두부찌개 밥 빼고 주문. 달걀 추가. 반찬 중 김치·나물만 먹기",
        macros: { cal: 380, carb: 10, fat: 22, protein: 28 },
        isDelivery: true,
      },
      dinner: {
        name: "돼지목살 구이 + 쌈채소",
        desc: "목살 300g 구워서 상추·깻잎·쌈장에 싸먹기. 쌈장은 1T 이하로",
        macros: { cal: 650, carb: 5, fat: 48, protein: 45 },
        recipe: {
          ingredients: ["돼지목살 300g", "상추 한 줌", "깻잎 5장", "쌈장 1T", "마늘 3쪽", "소금·후추"],
          steps: [
            "목살에 소금·후추 뿌려 상온에 15분",
            "팬 강불로 달궈서 기름 없이 앞뒤 5분씩 (기름이 충분히 나옴)",
            "마늘도 같이 구워주기",
            "먹기 좋게 썰어서 쌈 채소와 함께",
          ],
        },
      },
      snack: "삶은 달걀 2개 + 크림치즈 1T",
    },
  },
  {
    day: "수요일",
    emoji: "🍗",
    meals: {
      breakfast: {
        name: "방탄커피 + 치즈 오믈렛",
        desc: "커피에 버터 1T + MCT오일 1T 블렌더. 달걀 2개 + 체다치즈 오믈렛",
        macros: { cal: 480, carb: 2, fat: 42, protein: 20 },
      },
      lunch: {
        name: "🏢 배달: 보쌈",
        desc: "보쌈 주문해서 쌈 싸먹기. 밥 빼고, 새우젓·마늘 듬뿍. 보쌈김치도 OK (약간의 탄수 있지만 소량이면 괜찮)",
        macros: { cal: 550, carb: 8, fat: 35, protein: 42 },
        isDelivery: true,
      },
      dinner: {
        name: "감바스 알 아히요",
        desc: "새우를 올리브오일과 마늘에 푹 끓인 스페인식. 빵 대신 브로콜리 찍어먹기",
        macros: { cal: 520, carb: 4, fat: 42, protein: 30 },
        recipe: {
          ingredients: ["새우 200g (껍질 벗긴 것)", "올리브오일 5T", "마늘 8쪽 슬라이스", "페페론치노 2개", "소금", "파슬리"],
          steps: [
            "작은 팬에 올리브오일 넉넉히 붓고 약불",
            "마늘 슬라이스 + 페페론치노 넣고 마늘이 노릇할 때까지",
            "새우 넣고 중불에서 양면 2분씩 익히기",
            "소금 간하고 파슬리 뿌려서 완성. 브로콜리 찍어먹기",
          ],
        },
      },
      snack: "호두 10알",
    },
  },
  {
    day: "목요일",
    emoji: "🐟",
    meals: {
      breakfast: {
        name: "아보카도 달걀보트",
        desc: "아보카도 반으로 갈라 씨 자리에 달걀 깨넣고 에어프라이어 180도 10분",
        macros: { cal: 350, carb: 4, fat: 28, protein: 14 },
      },
      lunch: {
        name: "🏢 배달: 닭볶음탕 (밥X)",
        desc: "닭볶음탕 밥 빼고 주문. 감자는 남기고 닭고기 위주로. 국물에 야채 건져먹기",
        macros: { cal: 480, carb: 12, fat: 28, protein: 38 },
        isDelivery: true,
      },
      dinner: {
        name: "소고기 채끝 스테이크",
        desc: "채끝 250g + 버터에 볶은 아스파라거스. 취향껏 레어~미디엄",
        macros: { cal: 620, carb: 4, fat: 42, protein: 52 },
        recipe: {
          ingredients: ["소고기 채끝 250g", "버터 2T", "아스파라거스 5대", "마늘 2쪽", "소금·후추", "로즈마리(선택)"],
          steps: [
            "고기 상온에 30분 꺼내두기. 소금·후추 넉넉히",
            "팬 강불로 달궈서 기름 두르고 앞뒤 2분씩 (미디엄 기준)",
            "불 줄이고 버터 + 마늘 + 로즈마리 넣어 버터로 끼얹기 1분",
            "호일로 감싸 5분 레스팅. 아스파라거스는 남은 팬에 2분 볶기",
          ],
        },
      },
      snack: "삶은 달걀 1개 + 땅콩버터 1T (무설탕)",
    },
  },
  {
    day: "금요일",
    emoji: "🍺",
    meals: {
      breakfast: {
        name: "베이컨 에그",
        desc: "베이컨 4줄 바삭하게 + 달걀 2개 프라이. 베이컨 기름에 구우면 맛있음",
        macros: { cal: 450, carb: 1, fat: 35, protein: 30 },
      },
      lunch: {
        name: "🏢 배달: 족발 (앞다리살)",
        desc: "족발 소자 주문. 쌈 싸먹기. 새우젓 + 마늘. 막국수/냉면은 당연히 패스",
        macros: { cal: 520, carb: 5, fat: 32, protein: 45 },
        isDelivery: true,
      },
      dinner: {
        name: "🍻 외식: 고깃집 (삼겹살/갈비)",
        desc: "고깃집 가서 삼겹살·갈비 구워먹기! 상추쌈 무한. 된장찌개 OK. 공기밥·냉면만 참기",
        macros: { cal: 700, carb: 6, fat: 52, protein: 48 },
        isEatOut: true,
      },
      snack: "하이볼(위스키+탄산수) 1잔은 OK 🥃",
    },
  },
  {
    day: "토요일",
    emoji: "🏠",
    meals: {
      breakfast: {
        name: "키토 팬케이크",
        desc: "크림치즈 60g + 달걀 2개 + 아몬드가루 2T 섞어서 팬에 부치기. 버터 얹어서",
        macros: { cal: 420, carb: 4, fat: 34, protein: 22 },
        recipe: {
          ingredients: ["크림치즈 60g (상온)", "달걀 2개", "아몬드가루 2T", "베이킹파우더 약간", "버터 1T", "시나몬(선택)"],
          steps: [
            "크림치즈를 부드럽게 풀고 달걀·아몬드가루·베이킹파우더 섞기",
            "팬에 버터 녹이고 약불에서 반죽 떠넣기",
            "표면에 기포 올라오면 뒤집어서 1분 더",
            "버터 한 조각 얹고 시나몬 뿌려서 완성",
          ],
        },
      },
      lunch: {
        name: "🍣 외식: 횟집/초밥집",
        desc: "회(사시미) 위주로 주문. 초밥은 밥이라 패스. 매운탕은 OK. 소주 1잔 정도는 괜찮음",
        macros: { cal: 450, carb: 5, fat: 18, protein: 55 },
        isEatOut: true,
      },
      dinner: {
        name: "치즈 닭갈비 (키토 버전)",
        desc: "닭다리살 + 고추장 소량 + 치즈 듬뿍. 떡·고구마 빼고 양배추·깻잎만",
        macros: { cal: 600, carb: 10, fat: 38, protein: 48 },
        recipe: {
          ingredients: ["닭다리살 300g", "고추장 1/2T", "고춧가루 1T", "간장 1T", "마늘 2쪽", "모짜렐라 치즈 100g", "양배추 2장", "깻잎 3장"],
          steps: [
            "닭다리살에 고추장·고춧가루·간장·다진마늘 버무려 20분 재우기",
            "팬에 양배추 깔고 닭고기 올려서 중불에 볶기",
            "닭 익으면 가운데 치즈 듬뿍 올리고 뚜껑 덮어 2분",
            "치즈 늘어나면 깻잎 올려서 완성",
          ],
        },
      },
      snack: "마카다미아 10알 + 다크초콜릿 1조각 (카카오85% 이상)",
    },
  },
  {
    day: "일요일",
    emoji: "😴",
    meals: {
      breakfast: {
        name: "늦은 브런치: 키토 김치전",
        desc: "달걀 2개 + 아몬드가루 3T + 잘게 썬 김치. 돼지고기 넣으면 더 든든",
        macros: { cal: 400, carb: 6, fat: 28, protein: 26 },
        recipe: {
          ingredients: ["달걀 2개", "아몬드가루 3T", "신김치 1/4컵 잘게 썰기", "돼지고기 다짐육 50g", "참기름 1T", "들기름 1T"],
          steps: [
            "달걀·아몬드가루·김치·다짐육 섞기 (반죽 질면 아몬드가루 추가)",
            "팬에 들기름 두르고 중약불에서 반죽 펴기",
            "3분 뒤 뒤집어서 2분 더 (바삭하게)",
            "참기름 살짝 뿌려서 간장에 찍어먹기",
          ],
        },
      },
      lunch: {
        name: "🍲 외식: 샤브샤브/훠궈",
        desc: "고기 + 채소 무한리필! 면사리·떡사리 안 넣으면 완벽한 키토식. 칼국수 유혹 참기",
        macros: { cal: 550, carb: 8, fat: 35, protein: 45 },
        isEatOut: true,
      },
      dinner: {
        name: "다음 주 밀프렙하면서 간단히",
        desc: "삶은 달걀 3개 + 참치캔 1개 + 마요네즈 2T 섞어서 상추에 싸먹기",
        macros: { cal: 480, carb: 3, fat: 34, protein: 38 },
      },
      snack: "크림치즈 + 셀러리 스틱",
    },
  },
];

const DELIVERY_TIPS: DeliveryTip[] = [
  { category: "🔥 최고 추천", items: ["곱창/막창 볶음 (밥X)", "보쌈 (쌈 싸먹기)", "순두부찌개 (밥X)", "감바스"] },
  { category: "👍 괜찮은 선택", items: ["족발 (쌈)", "닭볶음탕 (감자 남기기)", "스테이크 배달 (밥X)", "회/사시미 배달"] },
  { category: "⚠️ 주의하면 OK", items: ["후라이드 치킨 (껍질 약간의 탄수)", "쭈꾸미볶음 (소스에 당분 있음)", "부대찌개 (라면 빼달라고)"] },
  { category: "🚫 피해야 할 것", items: ["떡볶이/분식류", "피자 (도우가 문제)", "중식 (전분 범벅)", "돈까스 (튀김옷)"] },
];

const EATOUT_TIPS: EatOutTip[] = [
  { place: "고깃집 🥩", good: "삼겹·목살·갈비 + 쌈채소 무한", avoid: "공기밥, 냉면, 볶음밥" },
  { place: "횟집 🐟", good: "회·사시미·매운탕·조개구이", avoid: "초밥, 회덮밥" },
  { place: "샤브샤브 🍲", good: "고기·해물·채소 무한", avoid: "면사리, 떡사리, 죽" },
  { place: "이자카야 🏮", good: "꼬치구이, 사시미, 에다마메", avoid: "맥주(하이볼로 대체), 튀김" },
  { place: "카페 ☕", good: "아메리카노, 무가당 라떼", avoid: "달달한 음료, 베이커리" },
];

interface MacroBarProps {
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
}

interface MealCardProps {
  meal: Meal;
  mealType: string;
  mealLabel: string;
}

const isDetailedMeal = (m: Meal): m is DetailedMeal =>
  typeof m === "object" && m !== null && "macros" in m;

export default function KetoMealPlan() {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TabKey>("plan");
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  const currentDay = DAYS[selectedDay];

  const totalMacros = Object.values(currentDay.meals)
    .filter(isDetailedMeal)
    .reduce<Macros>(
      (acc, m) => ({
        cal: acc.cal + m.macros.cal,
        carb: acc.carb + m.macros.carb,
        fat: acc.fat + m.macros.fat,
        protein: acc.protein + m.macros.protein,
      }),
      { cal: 0, carb: 0, fat: 0, protein: 0 }
    );

  const MacroBar = ({ label, value, unit, max, color }: MacroBarProps) => (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: "#888", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: "'DM Mono', monospace" }}>{value}<span style={{ fontSize: 11, fontWeight: 400 }}>{unit}</span></div>
      <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, marginTop: 4 }}>
        <div style={{ height: "100%", width: `${Math.min((value / max) * 100, 100)}%`, background: color, borderRadius: 2, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );

  const MealCard = ({ meal, mealType, mealLabel }: MealCardProps) => {
    if (typeof meal === "string") {
      return (
        <div style={{ padding: "12px 16px", background: "#111", borderRadius: 10, border: "1px solid #222" }}>
          <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>간식</div>
          <div style={{ fontSize: 14, color: "#ccc" }}>{meal}</div>
        </div>
      );
    }

    const isExpanded = expandedRecipe === `${selectedDay}-${mealType}`;
    const tagBg = meal.isDelivery ? "#f59e0b15" : meal.isEatOut ? "#8b5cf615" : "transparent";
    const tagColor = meal.isDelivery ? "#f59e0b" : meal.isEatOut ? "#8b5cf6" : "transparent";
    const tagText = meal.isDelivery ? "배달" : meal.isEatOut ? "외식" : "";

    return (
      <div style={{ padding: 16, background: "#111", borderRadius: 10, border: `1px solid ${meal.isDelivery ? '#f59e0b22' : meal.isEatOut ? '#8b5cf622' : '#222'}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1 }}>{mealLabel}</div>
          {tagText && (
            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: tagBg, color: tagColor, fontWeight: 600 }}>{tagText}</span>
          )}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#f0f0f0", marginBottom: 6 }}>{meal.name}</div>
        <div style={{ fontSize: 13, color: "#999", lineHeight: 1.5, marginBottom: 10 }}>{meal.desc}</div>
        <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#666" }}>
          <span><span style={{ color: "#e8e8e8", fontWeight: 600 }}>{meal.macros.cal}</span> kcal</span>
          <span>탄 <span style={{ color: "#4ade80" }}>{meal.macros.carb}g</span></span>
          <span>지 <span style={{ color: "#fbbf24" }}>{meal.macros.fat}g</span></span>
          <span>단 <span style={{ color: "#60a5fa" }}>{meal.macros.protein}g</span></span>
        </div>
        {meal.recipe && (
          <>
            <button
              onClick={() => setExpandedRecipe(isExpanded ? null : `${selectedDay}-${mealType}`)}
              style={{ marginTop: 10, padding: "6px 12px", background: "#1a1a1a", border: "1px solid #333", borderRadius: 6, color: "#ccc", fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}
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
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "plan", label: "식단표" },
    { key: "delivery", label: "배달 가이드" },
    { key: "eatout", label: "외식 가이드" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0f0f0", fontFamily: "'Pretendard', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px 16px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#4ade80", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>LOW CARB · HIGH FAT</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            저탄고지 1주일 식단
          </h1>
          <p style={{ fontSize: 13, color: "#666", marginTop: 6 }}>배달·외식 포함 현실적인 키토 플랜</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#111", borderRadius: 8, padding: 3 }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1, padding: "8px 0", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                background: activeTab === tab.key ? "#222" : "transparent",
                color: activeTab === tab.key ? "#f0f0f0" : "#666",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Meal Plan Tab */}
        {activeTab === "plan" && (
          <>
            {/* Day Selector */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20, overflowX: "auto" }}>
              {DAYS.map((d, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedDay(i); setExpandedRecipe(null); }}
                  style={{
                    flex: 1, minWidth: 52, padding: "10px 4px", border: "none", borderRadius: 8, cursor: "pointer", transition: "all 0.2s",
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
                {currentDay.emoji} {currentDay.day} 하루 총합 (간식 제외)
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
              <MealCard meal={currentDay.meals.breakfast} mealType="breakfast" mealLabel="아침" />
              <MealCard meal={currentDay.meals.lunch} mealType="lunch" mealLabel="점심" />
              <MealCard meal={currentDay.meals.dinner} mealType="dinner" mealLabel="저녁" />
              <MealCard meal={currentDay.meals.snack} mealType="snack" mealLabel="간식" />
            </div>
          </>
        )}

        {/* Delivery Guide Tab */}
        {activeTab === "delivery" && (
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
            {DELIVERY_TIPS.map((cat, i) => (
              <div key={i} style={{ padding: 14, background: "#111", borderRadius: 10, border: "1px solid #222" }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, color: "#e8e8e8" }}>{cat.category}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.items.map((item, j) => (
                    <span key={j} style={{
                      fontSize: 12, padding: "5px 10px", borderRadius: 20,
                      background: i === 0 ? "#4ade8015" : i === 1 ? "#60a5fa15" : i === 2 ? "#fbbf2415" : "#ef444415",
                      color: i === 0 ? "#4ade80" : i === 1 ? "#60a5fa" : i === 2 ? "#fbbf24" : "#ef4444",
                      border: `1px solid ${i === 0 ? "#4ade8022" : i === 1 ? "#60a5fa22" : i === 2 ? "#fbbf2422" : "#ef444422"}`,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Eat Out Guide Tab */}
        {activeTab === "eatout" && (
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
        )}

        <div style={{ marginTop: 24, padding: 14, background: "#0f0f0f", borderRadius: 10, border: "1px solid #1a1a1a", fontSize: 12, color: "#555", lineHeight: 1.6, textAlign: "center" }}>
          매크로 수치는 대략적인 참고값입니다.<br />개인 체질·활동량에 따라 조절하세요.
        </div>
      </div>
    </div>
  );
}
