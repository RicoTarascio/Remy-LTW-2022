import express, { Request, Response } from "express";
import createToken from "../../services/createToken";
import verifyToken from "../../services/verifyToken";
import getJWT from "../middlewares/getJWT";

const Router = express.Router();

const Logout = Router.get("/logout", async (req: Request, res: Response) => {
  return getJWT(req, (token) => {
    console.log(token);
    if (!token) return res.status(400).send("Token not present in cookies");

    const [err, payload] = verifyToken(token);

    if (payload) {
      const tokenUser = {
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
      };
      const token = createToken(tokenUser);

      const jwtExpirySeconds = 0;
      return res
        .cookie("token", token, {
          maxAge: +jwtExpirySeconds * 1000,
          secure: false,
        })
        .setHeader("token", token)
        .status(200)
        .end();
    } else res.status(400).end();
  });
});

export default Logout;
