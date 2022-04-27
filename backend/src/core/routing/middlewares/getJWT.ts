import { NextFunction, Request, Response } from "express";

const getJWT = (req: Request, next: NextFunction) => {
  if (!req.headers.cookie) return next(undefined);
  const cookies: string[] = req.headers.cookie.split(";");
  const token = cookies
    .find((cookie) => {
      return cookie.includes("token=");
    })
    ?.replace("token=", "")
    .trim();
  console.log(token);
  return next(token);
};

export default getJWT;
