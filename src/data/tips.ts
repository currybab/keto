import type { DeliveryTip, EatOutTip } from "../types";

export const DELIVERY_TIPS: DeliveryTip[] = [
  { category: "🔥 최고 추천", items: ["곱창/막창 볶음 (밥X)", "보쌈 (쌈 싸먹기)", "순두부찌개 (밥X)", "감바스"] },
  { category: "👍 괜찮은 선택", items: ["족발 (쌈)", "닭볶음탕 (감자 남기기)", "스테이크 배달 (밥X)", "회/사시미 배달"] },
  { category: "⚠️ 주의하면 OK", items: ["후라이드 치킨 (껍질 약간의 탄수)", "쭈꾸미볶음 (소스에 당분 있음)", "부대찌개 (라면 빼달라고)"] },
  { category: "🚫 피해야 할 것", items: ["떡볶이/분식류", "피자 (도우가 문제)", "중식 (전분 범벅)", "돈까스 (튀김옷)"] },
];

export const EATOUT_TIPS: EatOutTip[] = [
  { place: "고깃집 🥩", good: "삼겹·목살·갈비 + 쌈채소 무한", avoid: "공기밥, 냉면, 볶음밥" },
  { place: "횟집 🐟", good: "회·사시미·매운탕·조개구이", avoid: "초밥, 회덮밥" },
  { place: "샤브샤브 🍲", good: "고기·해물·채소 무한", avoid: "면사리, 떡사리, 죽" },
  { place: "이자카야 🏮", good: "꼬치구이, 사시미, 에다마메", avoid: "맥주(하이볼로 대체), 튀김" },
  { place: "카페 ☕", good: "아메리카노, 무가당 라떼", avoid: "달달한 음료, 베이커리" },
];
