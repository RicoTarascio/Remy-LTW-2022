import Product from "./product";

interface Meal {
  id: number;
  nutritionPlanID: number;
  hours: number;
  minutes: number;
  doneAt?: Date;
  quantity: number;
  weekDay: number;
  Product: Product;
}

export default Meal;
