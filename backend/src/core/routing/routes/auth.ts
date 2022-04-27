import express, { Request, Response } from "express";
import verifyToken from "../../services/verifyToken";
import getJWT from "../middlewares/getJWT";

const Router = express.Router();

const Auth = Router.get("/auth", async (req: Request, res: Response) => {
  return getJWT(req, (token) => {
    console.log(token);
    if (!token) return res.status(400).send("Token not present in cookies");

    const [err, payload] = verifyToken(token);

    if (err) return res.status(400).send("Token not valid");
    return res.status(200).send(payload);
  });
});

export default Auth;
