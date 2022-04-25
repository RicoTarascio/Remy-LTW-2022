import express, { Request, Response } from "express";
import verifyToken from "../../services/verifyToken";

const Router = express.Router();

const Auth = Router.get("/auth", async (req: Request, res: Response) => {
  if (!req.query || !req.query.token)
    return res.status(400).send("Token not present in request");

  const token = req.query.token;

  const [err, payload] = verifyToken(token);

  if (err) return res.status(400).send("Token not present in request");
  return res.status(200).send(payload);
});

export default Auth;
