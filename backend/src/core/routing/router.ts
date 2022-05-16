import express from "express";
import AddMealCompleted from "./routes/addMealCompleted";
import AddPet from "./routes/addPet";
import Auth from "./routes/auth";
import GetPet from "./routes/getPet";
import GetPets from "./routes/getPets";
import GetUser from "./routes/getUser";
import Hello from "./routes/hello";
import Login from "./routes/login";
import Logout from "./routes/logout";
import Register from "./routes/register";

const Router = express.Router();

Router.use(Hello);
Router.use(Login);
Router.use(Register);
Router.use(Logout);
Router.use(Auth);
Router.use(AddPet);
Router.use(GetPets);
Router.use(AddMealCompleted);
Router.use(GetUser);

Router.use(GetPet);

export default Router;
