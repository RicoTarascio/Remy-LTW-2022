import { User } from "@prisma/client";
import prismaClient from "../prismaClient";

const queryFindDBUser = async (email: string): Promise<User | null> => {
  return prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
};

export default queryFindDBUser;
