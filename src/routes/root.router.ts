import { Router } from "express";
import userRouters from "./user.routes";
import blogRouters from "./blog.router";

const rootRouter = Router();

rootRouter.use("/user", userRouters);
rootRouter.use("/blog", blogRouters);

export default rootRouter;
