import express from "express";
import Auth from "./routes/auth";
import Hello from "./routes/hello";
import Login from "./routes/login";
import Register from "./routes/register";

const Router = express.Router();

Router.use(Hello);
Router.use(Login);
Router.use(Register);
Router.use(Auth);

export default Router;
