import { Router } from "express";
import userRouters from "./user.routes";

const rootRouter = Router();

rootRouter.use("/user", userRouters);

export default rootRouter;
