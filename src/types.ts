export interface Macros {
  cal: number;
  carb: number;
  fat: number;
  protein: number;
}

export interface Recipe {
  ingredients: string[];
  steps: string[];
}

export interface DetailedMeal {
  name: string;
  desc: string;
  macros: Macros;
  recipe?: Recipe;
  isDelivery?: boolean;
  isEatOut?: boolean;
}

export type Meal = DetailedMeal | string;

export interface DayMeals {
  breakfast: DetailedMeal;
  lunch: DetailedMeal;
  dinner: DetailedMeal;
  snack: string;
}

export interface Day {
  day: string;
  emoji: string;
  meals: DayMeals;
}

export interface DeliveryTip {
  category: string;
  items: string[];
}

export interface EatOutTip {
  place: string;
  good: string;
  avoid: string;
}

export type TabKey = "plan" | "delivery" | "eatout";

export type MealMode = "three" | "two";

export const isDetailedMeal = (m: Meal): m is DetailedMeal =>
  typeof m === "object" && m !== null && "macros" in m;
