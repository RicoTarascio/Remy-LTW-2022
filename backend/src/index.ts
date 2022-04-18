import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import Router from "./core/routing/router";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(Router);
app.use(cors());
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
