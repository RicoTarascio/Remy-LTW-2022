import { User } from "@prisma/client";
import prismaClient from "../prismaClient";

const queryUpdateUser = (user: User) => {
  return prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
};

export default queryUpdateUser;
