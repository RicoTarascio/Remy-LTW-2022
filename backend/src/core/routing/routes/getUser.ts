import express, { Request, Response } from "express";
import queryFindDBUser from "../../db/queries/findUser";
import verifyToken from "../../services/verifyToken";
import getJWT from "../middlewares/getJWT";

const Router = express.Router();

const GetUser = Router.get("/getUser", async (req: Request, res: Response) => {
  return getJWT(req, async (token) => {
    if (!token) return res.status(400).send("Token not present in cookies");

    const [err, payload] = verifyToken(token);
    if (err) return res.status(400).send("Token not valid");
    if (payload) {
      const user = await queryFindDBUser(payload.email);
      if (user) return res.status(200).send(user);
    }
    return res
      .status(400)
      .send("Internal error, token was not verified correctly");
  });
});

export default GetUser;
