import Users from "../../../mock/mockUsers";

const findDBUser = (email: string) => {
  const userFound = Users.filter((user) => user.email === email);
  if (userFound.length > 0) return userFound[0];
  return undefined;
};

export default findDBUser;
