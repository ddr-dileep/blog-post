import { Router } from "express";
import registerController from "../controllers/user/register.user.controller";
import loginController from "../controllers/user/login.user.controller";
import getUserInfoController from "../controllers/user/get.user.info.controller";
import updateUserInfoController from "../controllers/user/update.user.info.controller";
import deleteUserInfoController from "../controllers/user/delete.user.info.controller";

import {
  loginUserMiddleware,
  registerUserMiddleware,
} from "../middlewares/user.middlewares";
import { authTokenMiddleware } from "../utils/token";

const userRouters = Router();

userRouters.post("/register", registerUserMiddleware, registerController);
userRouters.post("/login", loginUserMiddleware, loginController);
userRouters.get("/get-info", authTokenMiddleware, getUserInfoController);
userRouters.patch("/update-info", updateUserInfoController);
userRouters.delete("/delete-info", deleteUserInfoController);

export default userRouters;
