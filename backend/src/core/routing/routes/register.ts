import express, { Response } from "express";
import FormValidator from "../../../utils/formValidator";
import findDBUser from "../../db/queries/findUser";
import { RegisterBody } from "../../types/registerBody";
import { RequestTyped } from "../../types/requestTyped";
import bcrypt from "bcrypt";
import createToken from "../../services/createToken";

const Router = express.Router();

const Register = Router.get(
  "/register",
  async (req: RequestTyped<RegisterBody>, res: Response) => {
    if (!req.body || !req.body.plainPwd || !req.body.email) {
      return res.status(400).send(`Need email and password to register.`);
    }

    const email = req.body.email;
    const dbUser = findDBUser(email);

    if (dbUser) return res.status(400).send("Email already in use");

    const plainPassword = req.body.plainPwd;
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
            // ....

            // Create token
            console.log({
              ...req.body,
            });
            const token = createToken({
              ...req.body,
            });
            const jwtExpirySeconds = process.env.JWT_EXPIRY_SECONDS!;
            res.cookie("token", token, { maxAge: +jwtExpirySeconds * 1000 });
            return res.status(200).end();
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
