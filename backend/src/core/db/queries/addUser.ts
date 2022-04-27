import { User } from "@prisma/client";
import prismaClient from "../prismaClient";

const queryAddUser = async (user: User) => {
  const userCreated = await prismaClient.user.create({
    data: user,
  });
  return userCreated;
};

export default queryAddUser;
