import { Router } from "express";
import userRouters from "./user.routes";
import blogRouters from "./blog.router";
import categoryRouter from "./category.router";

const rootRouter = Router();

rootRouter.use("/user", userRouters);
rootRouter.use("/blog", blogRouters);
rootRouter.use("/category", categoryRouter);

export default rootRouter;
