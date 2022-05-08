import Product from "./product";

interface MealCompleted {
  mealID: number;
  when: string;
}

interface Meal {
  id: number;
  nutritionPlanID: number;
  hours: number;
  minutes: number;
  quantity: number;
  weekDay: number;
  Product: Product;
  completedDates: MealCompleted[];
}

export default Meal;
