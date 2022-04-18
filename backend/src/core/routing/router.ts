import express from "express";
import Hello from "./routes/hello";
import Login from "./routes/login";

const Router = express.Router();

Router.use(Hello);
Router.use(Login);

export default Router;
