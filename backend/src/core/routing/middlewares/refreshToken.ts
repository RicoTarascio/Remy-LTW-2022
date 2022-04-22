import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserToken } from "../../types/token";

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  if (!isUserAlreadyLogged(req)) {
    next();
  } else {
    // User already has token,
    // check if token is about to expire,
    // if yes refresh, return token otherwise
    const [, token] = getJWT(req);
    const [, payload] = verifyToken(token!);
    if (payload && isTokenAboutToExpire(payload)) {
      const tokenUser = {
        name: payload.name,
        email: payload.email,
      };

      const JWT_SECRET = process.env.JWT_SECRET!;
      const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;
      const token = jwt.sign(tokenUser, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: +jwtExpirySeconds,
      });
      res.cookie("token", token!, { maxAge: +jwtExpirySeconds * 1000 });
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  }
};

const getJWT = (
  req: Request
): [err: Error | undefined, token: string | undefined] => {
  if (!req.headers.cookie) return [new Error("Cookies not present"), undefined];
  const token: string = req.headers.cookie.replace("token=", "");
  if (!token) return [new Error("Token not present"), undefined];
  return [undefined, token];
};

const verifyToken = (
  token: Object
): [error: Error | undefined, payload: jwt.JwtPayload | undefined] => {
  const stringToken = token.toString();
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const payload = jwt.verify(stringToken, JWT_SECRET) as jwt.JwtPayload;
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

const isTokenAboutToExpire = (payload: jwt.JwtPayload) => {
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  if (payload.exp! - nowUnixSeconds > 30) return false;
  return true;
};

export default refreshToken;
