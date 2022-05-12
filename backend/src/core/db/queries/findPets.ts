import prismaClient from "../prismaClient";

const queryFindPets = async (userID: number, nutritionPlans?: Object, petID?: number) => {
  return await prismaClient.pet.findMany({
    where: {
      userID: userID,
      id: petID
    },
    include: nutritionPlans,
  });
};

export default queryFindPets;
