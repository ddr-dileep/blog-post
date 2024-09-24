import { Router } from "express";
import registerController from "../controllers/user/register.controller";

const userRouters = Router();

userRouters.post("/register", registerController);

export default userRouters;
