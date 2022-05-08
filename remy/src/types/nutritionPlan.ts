import Meal from "./meal";

export default interface NutritionPlan {
  id: string;
  petID: string;
  meals: Meal[];
  from: Date;
  to: Date;
}
