import express, { Request, Response } from "express";
import FormValidator from "../../../utils/formValidator";
import findDBUser from "../../db/queries/findUser";
import bcrypt from "bcrypt";
import createToken from "../../services/createToken";
import { User } from "@prisma/client";
import queryAddUser from "../../db/queries/addUser";

const Router = express.Router();

const Register = Router.get(
  "/register",
  async (req: Request, res: Response) => {
    if (
      !req.query ||
      !req.query.plainPwd ||
      !req.query.email ||
      !req.query.name ||
      !req.query.surname
    ) {
      return res
        .status(400)
        .send(`Need name, surname, email and password to register.`);
    }

    const email = req.query.email as string;
    const dbUser = await findDBUser(email);

    if (dbUser) return res.status(400).send("Email already in use");

    const plainPassword = req.query.plainPwd as string;
    const validationErrors = validateSubmission(email, plainPassword);
    if (validationErrors) return res.status(400).send(validationErrors);

    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res.status(400).send("Errore inaspettato, per favore riprova.");
      if (salt) {
        bcrypt.hash(plainPassword, salt, (err, hash) => {
          if (err)
            return res
              .status(400)
              .send("Errore inaspettato, per favore riprova.");
          if (hash) {
            // Add user to db
            queryAddUser({
              name: req.query.name as string,
              surname: req.query.surname as string,
              email: email,
              hash: hash,
            } as User);

            // Create token
            const token = createToken({
              name: req.query.name as string,
              surname: req.query.surname as string,
              email: email,
            });
            const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;
            return res
              .cookie("token", token, { maxAge: +jwtExpirySeconds * 1000 })
              .setHeader("token", token)
              .status(200)
              .end();
          }
        });
      }
    });
  }
);

const validateSubmission = (email: string, password: string) => {
  const validator = new FormValidator();
  validator.validateEmail(email);
  validator.validatePassword(password);
  return validator.getErrorsFormatted();
};

export default Register;
