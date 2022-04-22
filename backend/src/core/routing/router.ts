import express from "express";
import Hello from "./routes/hello";
import Login from "./routes/login";
import Register from "./routes/register";

const Router = express.Router();

Router.use(Hello);
Router.use(Login);
Router.use(Register);

export default Router;
