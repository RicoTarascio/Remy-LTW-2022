import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import Users from "../../../mock/mockUsers";

const Router = express.Router();

const Login = Router.get("/login", async (req: Request, res: Response) => {
  if (!req.body || !req.body.plainPwd || !req.body.email) {
    res.status(400).send(`Need email and password to login.`);
    return;
  }

  const email = req.body.email;
  const dbUser = findDBUser(email);

  if (dbUser) {
    const plainPwd = req.body.plainPwd;
    const pwdMatch = await comparePassword(plainPwd, dbUser.hash);
    if (pwdMatch) {
      res.status(200).send(dbUser);
      return;
    }
    res.status(400).send(`Password is incorrect`);
    return;
  }
  res.status(400).send(`Email: ${email} not found.`);
  return;
});

const comparePassword = async (
  plain: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};

const findDBUser = (email: string) => {
  const userFound = Users.filter((user) => user.email === email);
  if (userFound.length > 0) return userFound[0];
  return undefined;
};

export default Login;
