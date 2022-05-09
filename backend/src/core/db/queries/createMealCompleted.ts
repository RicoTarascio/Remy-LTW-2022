import { MealCompleted, Pet } from "@prisma/client";
import prismaClient from "../prismaClient";

const queryAddMealCompleted = async (mealCompleted: MealCompleted) => {
  return prismaClient.mealCompleted.create({
    data: {
      ...mealCompleted,
    },
  });
};

export default queryAddMealCompleted;
