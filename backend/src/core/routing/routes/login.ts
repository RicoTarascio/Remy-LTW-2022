import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import refreshToken from "../middlewares/refreshToken";
import findDBUser from "../../db/queries/findUser";
import createToken from "../../services/createToken";

const Router = express.Router();

const Login = Router.get(
  "/login",
  refreshToken,
  async (req: Request, res: Response) => {
    if (!req.query || !req.query.plainPwd || !req.query.email) {
      return res.status(400).send(`Need email and password to login.`);
    }

    const email = req.query.email as string;
    const dbUser = await findDBUser(email);

    if (dbUser) {
      const plainPwd = req.query.plainPwd as string;
      const pwdMatch = await comparePassword(plainPwd, dbUser.hash);
      if (pwdMatch) {
        const tokenUser = {
          name: dbUser.name,
          surname: dbUser.surname,
          email: dbUser.email,
        };
        const token = createToken(tokenUser);

        const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;
        return res
          .cookie("token", token, {
            maxAge: +jwtExpirySeconds * 1000,
            secure: false,
          })
          .setHeader("token", token)
          .status(200)
          .end();
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
