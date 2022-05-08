import NutritionPlan from "./nutritionPlan";

interface Pet {
  id: number;
  userID: number;
  species: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  nutritionPlans: NutritionPlan[];
}

export default Pet;
