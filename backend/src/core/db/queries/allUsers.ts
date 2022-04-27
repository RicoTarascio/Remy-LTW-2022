import { User } from "@prisma/client";
import prismaClient from "../prismaClient";

const queryAllUsers = async (): Promise<User[]> => {
  const allUsers = await prismaClient.user.findMany();
  return allUsers;
};

export default queryAllUsers;
