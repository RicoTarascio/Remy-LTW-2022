import express from "express";
import AddMealCompleted from "./routes/addMealCompleted";
import AddPet from "./routes/addPet";
import Auth from "./routes/auth";
import DeletePet from "./routes/deletePet";
import GetPet from "./routes/getPet";
import GetPets from "./routes/getPets";
import GetUser from "./routes/getUser";
import Login from "./routes/login";
import Logout from "./routes/logout";
import Register from "./routes/register";
import UpdateUser from "./routes/updateUser";

const Router = express.Router();

Router.use(Login);
Router.use(Register);
Router.use(Logout);
Router.use(Auth);
Router.use(AddPet);
Router.use(GetPets);
Router.use(AddMealCompleted);
Router.use(GetUser);
Router.use(UpdateUser);
Router.use(DeletePet);

Router.use(GetPet);

export default Router;
