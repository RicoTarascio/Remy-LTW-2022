import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import Router from "./core/routing/router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import prismaClient from "./core/db/prismaClient";
import { Sql } from "@prisma/client/runtime";
import { products } from "./mock/mockProducts";

dotenv.config();
const app = express();

app.use(
  cors({
    allowedHeaders: ["token", "Cookies", "Content-Type"],
    methods: ["POST", "GET"],
    exposedHeaders: ["token", "Cookies", "application/json"],
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(Router);
app.use("/images", express.static(__dirname + "/images"));

app.listen(process.env.SERVER_PORT, async () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
