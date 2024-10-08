import { Router } from "express";
import createCategoryController from "../controllers/category/create.category.controller";
import { authTokenMiddleware } from "../utils/token";
import { createCategoryMiddleware } from "../middlewares/category.middlewares";
import getAllCategoryController, { getCategoryByIdController } from "../controllers/category/get.category.controllers";
import updateCategoryController from "../controllers/category/update.category.controller";
import deleteCategoryController from "../controllers/category/delete.category.controller";

const categoryRouter = Router();
export default categoryRouter;

categoryRouter.post(
  "/create",
  createCategoryMiddleware,
  authTokenMiddleware,
  createCategoryController
);
categoryRouter.get("/", getAllCategoryController);
categoryRouter.patch("/:categoryId", updateCategoryController);
categoryRouter.delete("/:categoryId", deleteCategoryController);
categoryRouter.get("/:categoryId", getCategoryByIdController);
