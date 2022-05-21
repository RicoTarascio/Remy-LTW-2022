import prismaClient from "../prismaClient";

const queryDeletePet = async (petID: number) => {
  return await prismaClient.pet.delete({
    where: {
      id: petID,
    },
  });
};

export default queryDeletePet;
