import { Pet } from "@prisma/client";
import prismaClient from "../prismaClient";

const queryCreatePet = async (userID: number, pet: Pet) => {
  return prismaClient.pet.create({
    data: {
      ...pet,
      userID: userID,
    },
  });
};

export default queryCreatePet;
