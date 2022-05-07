import { NextFunction, Request, Response } from "express";
import verifyToken from "../../services/verifyToken";
import getJWT from "./getJWT";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  return getJWT(req, (token) => {
    if (!token) return res.status(400).send("User not authenticated");

    const [err] = verifyToken(token);

    if (err) return res.status(401).send("User not authenticated");
    next();
  });
};

export default requireAuth;
