import express from "express";

const Router = express.Router();

const Hello = Router.get("/hello", async (req, res) => {
  res.status(200).send("Hello!");
});

export default Hello;
