import { Router } from "express";
import { authTokenMiddleware } from "../utils/token";
import createBlogPostController from "../controllers/blog/create.blog.controller";
import { createBlogPostMiddleware } from "../middlewares/blog.middlewares";
import getBlogPostByIdController from "../controllers/blog/get.blog.controller";

const blogRouters = Router();

blogRouters.post(
  "/create",
  createBlogPostMiddleware,
  authTokenMiddleware,
  createBlogPostController
);
blogRouters.get("/:blogId", getBlogPostByIdController);

export default blogRouters;