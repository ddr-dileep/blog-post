import { Router } from "express";
import registerController from "../controllers/user/register.user.controller";
import loginController from "../controllers/user/login.user.controller";
import getUserInfoController from "../controllers/user/get.user.info.controller";
import updateUserInfoController from "../controllers/user/update.user.info.controller";
import deleteUserInfoController from "../controllers/user/delete.user.info.controller";

import { registerUserMiddleware } from "../middlewares/user.middlewares";

const userRouters = Router();

userRouters.post("/register", registerUserMiddleware, registerController);
userRouters.post("/login", loginController);
userRouters.get("/get-info", getUserInfoController);
userRouters.patch("/update-info", updateUserInfoController);
userRouters.delete("/delete-info", deleteUserInfoController);

export default userRouters;
