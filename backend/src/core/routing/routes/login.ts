import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import Users from "../../../mock/mockUsers";
import jwt from "jsonwebtoken";

const Router = express.Router();

const Login = Router.get("/login", async (req: Request, res: Response) => {
  if (isUserAlreadyLogged(req))
    return res
      .status(400)
      .send(`User is already logged in and session is valid`);

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
      const jwtExpirySeconds = 864000; // 10 days
      const token = jwt.sign(dbUser, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      });
      console.log(token);
      res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
      return res.end();
    }
    return res.status(400).send(`Password is incorrect`);
  }
  return res.status(400).send(`Email: ${email} not found.`);
});

const getJWT = (
  req: Request
): [err: Error | undefined, token: Object | undefined] => {
  if (!req.headers.cookie) return [new Error("Cookies not present"), undefined];
  const token = req.headers.cookie.replace("token=", "");
  if (!token) return [new Error("Token not present"), undefined];
  return [undefined, token];
};

const verifyToken = (
  token: Object
): [error: Error | undefined, payload: string | jwt.JwtPayload | undefined] => {
  const stringToken = token.toString();
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const payload = jwt.verify(stringToken, JWT_SECRET);
    return [undefined, payload];
  } catch (error: any) {
    return [error, undefined];
  }
};

const isUserAlreadyLogged = (req: Request): boolean => {
  const [err, token] = getJWT(req);
  if (token) {
    const [err, payload] = verifyToken(token);
    if (payload) {
      return true;
    }
    return false;
  }
  return false;
};

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
