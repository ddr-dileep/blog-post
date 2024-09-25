import { Router } from "express";
import { authTokenMiddleware } from "../utils/token";
import createBlogPostController from "../controllers/blog/create.blog.controller";
import { createBlogPostMiddleware } from "../middlewares/blog.middlewares";
import getBlogPostByIdController, {
  getAllBlogPostsController,
  getLoggedInUsersBlogPostsControllers,
} from "../controllers/blog/get.blog.controller";
import deleteBlogPostController, {
  deleteMultipleBlogPostsController,
} from "../controllers/blog/delete.blog.controllers";

const blogRouters = Router();

blogRouters.post(
  "/create",
  createBlogPostMiddleware,
  authTokenMiddleware,
  createBlogPostController
);
blogRouters.get(
  "/my-blog",
  authTokenMiddleware,
  getLoggedInUsersBlogPostsControllers
);
blogRouters.get("/", getAllBlogPostsController);
blogRouters.get("/:blogId", getBlogPostByIdController);
blogRouters.delete("/:blogId", authTokenMiddleware, deleteBlogPostController);
blogRouters.delete(
  "/delete-blog-post",
  authTokenMiddleware,
  deleteMultipleBlogPostsController
);

export default blogRouters;
