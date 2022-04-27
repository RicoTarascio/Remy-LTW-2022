import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import createToken from "../../services/createToken";
import verifyToken from "../../services/verifyToken";
import getJWT from "./getJWT";

const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  return getJWT(req, (token) => {
    if (!token || !isUserAlreadyLogged(token)) {
      next();
    } else {
      // User already has token,
      // check if token is about to expire,
      // if yes refresh it, otherwise do nothing
      const [, payload] = verifyToken(token);
      if (payload && isTokenAboutToExpire(payload)) {
        const tokenUser = {
          name: payload.name,
          email: payload.email,
        };
        const createdToken = createToken(tokenUser);

        const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;
        res
          .cookie("token", createdToken, {
            maxAge: +jwtExpirySeconds * 1000,
            secure: false,
          })
          .setHeader("token", createdToken)
          .status(200)
          .end();
      } else {
        res.status(400).end();
      }
    }
  });
};

const isUserAlreadyLogged = (token: string): boolean => {
  const [err, payload] = verifyToken(token);
  if (payload) {
    return true;
  }
  return false;
};

const isTokenAboutToExpire = (payload: jwt.JwtPayload) => {
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  if (payload.exp! - nowUnixSeconds > 30) return false;
  return true;
};

export default refreshToken;
