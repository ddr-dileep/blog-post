import { Router } from "express";
import createCategoryController from "../controllers/category/create.category.controller";
import { authTokenMiddleware } from "../utils/token";
import { createCategoryMiddleware } from "../middlewares/category.middlewares";

const categoryRouter = Router();
export default categoryRouter;

categoryRouter.post(
  "/create",
  createCategoryMiddleware,
  authTokenMiddleware,
  createCategoryController
);
