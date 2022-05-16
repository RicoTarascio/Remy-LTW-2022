import { Pet } from "@prisma/client";
import express, { Request, Response } from "express";
import queryFindPets from "../../db/queries/findPets";
import queryFindDBUser from "../../db/queries/findUser";
import verifyToken from "../../services/verifyToken";
import getJWT from "../middlewares/getJWT";
import requireAuth from "../middlewares/requireAuth";

const Router = express.Router();

const GetPet = Router.get(
  "/getPet",
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
            return res.status(400).send(`Il pet non è stato trovato`);
        }

        const petID= req.query.petID as string;

        if (req.query && req.query.includeNutrition)
          pet = await queryFindPets(user.id, {
            nutritionPlans: {
              include: {
                meals: { include: { Product: true, completedDates: true } },
              }, 
            }, 
          }, parseInt(petID) );
        else pet = await queryFindPets(user.id, parseInt(petID));
        return res.status(200).send(pet);
      }
    });
  }
);

export default GetPet;
