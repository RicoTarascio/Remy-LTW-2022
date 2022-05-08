import prismaClient from "../prismaClient";

const queryFindPets = async (userID: number, nutritionPlans?: Object) => {
  return await prismaClient.pet.findMany({
    where: {
      userID: userID,
    },
    include: nutritionPlans,
  });
};

export default queryFindPets;
