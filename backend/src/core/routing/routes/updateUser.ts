import express, { Request, Response } from "express";
import refreshToken from "../middlewares/refreshToken";
import createToken from "../../services/createToken";
import getJWT from "../middlewares/getJWT";
import verifyToken from "../../services/verifyToken";
import queryFindDBUser from "../../db/queries/findUser";
import queryUpdateUser from "../../db/queries/updateUser";

const Router = express.Router();

const UpdateUser = Router.post(
  "/updateUser",
  async (req: Request, res: Response) => {
    return getJWT(req, async (token) => {
      if (!token) return res.status(400).send("Token not present in cookies");
      if (!req.body || !req.body.name || !req.body.surname || !req.body.email) {
        return res.status(400).send(`Need email, name and surname to update.`);
      }

      const [err, payload] = verifyToken(token);
      if (err) return res.status(400).send("Token not valid");
      if (payload) {
        const user = await queryFindDBUser(payload.email);
        if (user) {
          user.email = req.body.email as string;
          user.name = req.body.name as string;
          user.surname = req.body.surname as string;

          if (user.email !== (req.body.email as string)) {
            const userWithNewEmail = await queryFindDBUser(
              req.body.email as string
            );

            if (userWithNewEmail) {
              return res
                .status(400)
                .send("Un account con l'email inserita esiste già.");
            }
          }
          const updatedUser = await queryUpdateUser(user);
          const newToken = createToken(updatedUser);
          const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;
          return res
            .cookie("token", newToken, {
              maxAge: +jwtExpirySeconds * 1000,
              secure: false,
            })
            .setHeader("token", newToken)
            .status(200)
            .end();
        }
        return res.status(400).send("Error while finding the user.");
      }
      return res
        .status(400)
        .send("Internal error, token was not verified correctly");
    });
  }
);

export default UpdateUser;
