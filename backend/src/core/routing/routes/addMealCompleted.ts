import { MealCompleted, Pet } from "@prisma/client";
import express, { Request, Response } from "express";
import prismaClient from "../../db/prismaClient";
import queryAddMealCompleted from "../../db/queries/createMealCompleted";
import verifyToken from "../../services/verifyToken";
import getJWT from "../middlewares/getJWT";
import requireAuth from "../middlewares/requireAuth";

const Router = express.Router();

interface MealCompletedRequest extends Request {
  body: MealCompleted;
}

const AddMealCompleted = Router.post(
  "/addMealCompleted",
  requireAuth,
  async (req: MealCompletedRequest, res: Response) => {
    return getJWT(req, async (token) => {
      const [err, payload] = verifyToken(token);

      if (payload) {
        //Check if meal is already completed on that date
        const dbResult = await prismaClient.mealCompleted.findUnique({
          where: {
            mealID_when: {
              mealID: req.body.mealID,
              when: req.body.when,
            },
          },
        });
        if (dbResult)
          return res
            .status(400)
            .send("Il pasto è stato già completato in data: " + req.body.when);
        const mealCompleted = await queryAddMealCompleted(req.body);
        return res.status(200).send(mealCompleted);
      } else {
        return res
          .status(400)
          .send(
            "C'è stato un errore nella verifica dell'utente, per favore accedi di nuovo"
          );
      }
    });
  }
);

export default AddMealCompleted;
