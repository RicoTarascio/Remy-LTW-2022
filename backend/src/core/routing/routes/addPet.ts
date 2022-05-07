import { Pet } from "@prisma/client";
import express, { Request, Response } from "express";
import queryCreatePet from "../../db/queries/createPet";
import queryFindDBUser from "../../db/queries/findUser";
import verifyToken from "../../services/verifyToken";
import getJWT from "../middlewares/getJWT";
import requireAuth from "../middlewares/requireAuth";

const Router = express.Router();

interface PetRequest extends Request {
  body: Pet;
}

const AddPet = Router.post(
  "/addPet",
  requireAuth,
  async (req: PetRequest, res: Response) => {
    return getJWT(req, async (token) => {
      const [err, payload] = verifyToken(token);

      if (payload) {
        const user = await queryFindDBUser(payload.email);
        if (!user)
          return res
            .status(400)
            .send("L'utente non è stato trovato per favore accedi di nuovo");
        const pet = await queryCreatePet(user.id, req.body);
        return res.status(200).send(pet);
      }
    });
  }
);

export default AddPet;
