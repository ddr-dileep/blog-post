import { Request, Response } from "express";
import BlogModel from "../../models/blog.model";
import apiResponse from "../../utils/api-response";

export default async function createBlogPostController(
  req: Request | any,
  res: Response
) {
  try {
    // same blog title is exist of the same user
    const existingBlogPost: any = await BlogModel.findOne({
      title: req.body.title,
      createdBy: req.user.userId,
    });

    if (existingBlogPost) {
      return res
        .status(409)
        .json(
          apiResponse.ERROR(
            "conflict",
            "A blog post with the same title already exists"
          )
        );
    }

    const newBlogPost = new BlogModel({
      ...req.body,
      createdBy: req.user.userId,
    });
    await newBlogPost.save();
    await newBlogPost.populate({
      path: "createdBy",
      select: "username email avatar",
    });

    res.status(201).json(
      apiResponse.SUCCESS(
        {
          blog: newBlogPost,
        },
        "Blog post created successfully"
      )
    );
  } catch (error) {
    res.status(500).json(apiResponse.OTHER(error));
  }
}
