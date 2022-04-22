import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import Users from "../../../mock/mockUsers";
import jwt from "jsonwebtoken";
import refreshToken from "../middlewares/refreshToken";

const Router = express.Router();

const Login = Router.get(
  "/login",
  refreshToken,
  async (req: Request, res: Response) => {
    if (!req.body || !req.body.plainPwd || !req.body.email) {
      return res.status(400).send(`Need email and password to login.`);
    }

    const email = req.body.email;
    const dbUser = findDBUser(email);

    if (dbUser) {
      const plainPwd = req.body.plainPwd;
      const pwdMatch = await comparePassword(plainPwd, dbUser.hash);
      if (pwdMatch) {
        const JWT_SECRET = process.env.JWT_SECRET!;
        const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;
        const tokenUser = {
          name: dbUser.name,
          email: dbUser.email,
        };
        const token = jwt.sign(tokenUser, JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: +jwtExpirySeconds,
        });
        console.log(token);
        res.cookie("token", token, { maxAge: +jwtExpirySeconds * 1000 });
        return res.status(200).end();
      }
      return res.status(400).send(`Password is incorrect`);
    }
    return res.status(400).send(`Email: ${email} not found.`);
  }
);

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
