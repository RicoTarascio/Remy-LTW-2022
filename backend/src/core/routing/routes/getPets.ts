import { Pet } from "@prisma/client";
import express, { Request, Response } from "express";
import queryFindPets from "../../db/queries/findPets";
import queryFindDBUser from "../../db/queries/findUser";
import verifyToken from "../../services/verifyToken";
import getJWT from "../middlewares/getJWT";
import requireAuth from "../middlewares/requireAuth";

const Router = express.Router();

const GetPets = Router.get(
  "/getPets",
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
        let pets: Pet[] = [];
        if (req.query && req.query.includeNutrition)
          pets = await queryFindPets(user.id, {
            nutritionPlans: {
              include: {
                meals: { include: { Product: true, completedDates: true } },
              },
            },
          });
        else pets = await queryFindPets(user.id);
        return res.status(200).send(pets);
      }
    });
  }
);

export default GetPets;
