import { Pet } from "@prisma/client";
import express, { Request, Response } from "express";
import queryDeletePet from "../../db/queries/deletePet";
import queryFindPets from "../../db/queries/findPets";
import queryFindDBUser from "../../db/queries/findUser";
import verifyToken from "../../services/verifyToken";
import getJWT from "../middlewares/getJWT";
import requireAuth from "../middlewares/requireAuth";

const Router = express.Router();

const DeletePet = Router.get(
  "/deletePet",
  requireAuth,
  async (req: Request, res: Response) => {
    return getJWT(req, async (token) => {
      const [err, payload] = verifyToken(token);

      if (payload) {
        const user = await queryFindDBUser(payload.email);
        if (!user)
          return res
            .status(400)
            .send("L'utente non è stato trovato per favore accedi di nuovo");
        let pet: Pet[] = [];

        if (!req.query || !req.query.petID) {
          return res.status(400).send(`Ho bisogno del pet id`);
        }

        const petID = req.query.petID as string;

        if (req.query.includeNutrition)
          pet = await queryFindPets(
            user.id,
            {
              nutritionPlans: {
                include: {
                  meals: { include: { Product: true, completedDates: true } },
                },
              },
            },
            +petID
          );
        else pet = await queryFindPets(user.id, undefined, +petID);
        if (pet.length)
          return res.status(200).send(await queryDeletePet(pet[0].id));
        else
          return res.status(400).send("Pet con ID: " + petID + " non trovato.");
      }
    });
  }
);

export default DeletePet;
