import { User } from "@prisma/client";
import Users from "../../../mock/mockUsers";
import prismaClient from "../prismaClient";

const findDBUser = async (email: string): Promise<User | null> => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export default findDBUser;
