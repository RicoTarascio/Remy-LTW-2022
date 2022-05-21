import { Meal } from "@prisma/client";
import prismaClient from "../db/prismaClient";

const createNutritionPlan = async (petID: number) => {
  const nutritionPlanCreated = await prismaClient.nutritionPlan.create({
    data: {
      petID: petID,
      from: new Date(),
      to: new Date(),
    },
  });

  await createMeals(nutritionPlanCreated.id);
};

const createMeals = async (nutritionPlanID: number) => {
  // For each weekday creates a random meal at a random time with a random product

  //Get products ids
  const productIDs = await prismaClient.product.findMany({
    select: {
      id: true,
    },
  });

  const meals: Meal[] = [];
  for (let i = 0; i < 7; i++) {
    const meal = {
      nutritionPlanID: nutritionPlanID,
      hours: randomBetween(8, 21),
      minutes: randomBetween(0, 45),
      quantity: randomBetween(30, 200),
      weekDay: i,
      productID: randomBetween(0, productIDs.length),
    } as Meal;
    meals.push(meal);
  }

  return await prismaClient.meal.createMany({
    data: meals,
  });
};

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default createNutritionPlan;
