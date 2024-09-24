import { Router } from "express";
import { authTokenMiddleware } from "../utils/token";
import createBlogPostController from "../controllers/blog/create.blog.controller";
import { createBlogPostMiddleware } from "../middlewares/blog.middlewares";

const blogRouters = Router();

blogRouters.post(
  "/create",
  createBlogPostMiddleware,
  authTokenMiddleware,
  createBlogPostController
);

export default blogRouters;
