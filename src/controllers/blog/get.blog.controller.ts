import { Request, Response } from "express";
import BlogModel from "../../models/blog.model";
import apiResponse from "../../utils/api-response";

export default async function getBlogPostByIdController(
  req: Request | any,
  res: Response
) {
  try {
    const blog: any = await BlogModel.findById(req.params.blogId).populate({
      path: "createdBy",
      select: "username email avatar",
    });

    if (!blog) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Blog post not found"));
    }

    res.status(201).json(
      apiResponse.SUCCESS(
        {
          blog,
        },
        "Blog post created successfully"
      )
    );
  } catch (error) {
    res.status(500).json(apiResponse.OTHER(error));
  }
}

export async function getallBlogPostsController(
  req: Request | any,
  res: Response
) {
  try {
    const blogs: any = await BlogModel.find().populate({
      path: "createdBy",
      select: "username email avatar",
    });

    if (!blogs) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "No blog posts found"));
    }

    res.status(201).json(
      apiResponse.SUCCESS(
        {
          count: blogs.length,
          blogs,
        },
        "Blog posts created successfully"
      )
    );
  } catch (error) {
    res.status(500).json(apiResponse.OTHER(error));
  }
}
