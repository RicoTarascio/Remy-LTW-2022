import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import refreshToken from "../middlewares/refreshToken";
import findDBUser from "../../db/queries/findUser";
import createToken from "../../services/createToken";
import { RequestTyped } from "../../types/requestTyped";
import { LoginBody } from "../../types/loginBody";

const Router = express.Router();

const Login = Router.get(
  "/login",
  refreshToken,
  async (req: RequestTyped<LoginBody>, res: Response) => {
    if (!req.body || !req.body.plainPwd || !req.body.email) {
      return res.status(400).send(`Need email and password to login.`);
    }

    const email = req.body.email;
    const dbUser = findDBUser(email);

    if (dbUser) {
      const plainPwd = req.body.plainPwd;
      const pwdMatch = await comparePassword(plainPwd, dbUser.hash);
      if (pwdMatch) {
        const tokenUser = {
          name: dbUser.name,
          email: dbUser.email,
        };
        const token = createToken(tokenUser);

        const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;
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

export default Login;
