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

    res.status(200).json(
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

export async function getAllBlogPostsController(req: Request, res: Response) {
  try {
    const { title, body, tags }: any = req.query;

    // Constructing the query based on provided filters
    const query: any = {};
    if (title || body || tags) {
      query.$and = [];
      if (title) {
        query.$and.push({ title: new RegExp(title, "i") });
      }
      if (body) {
        query.$and.push({ body: new RegExp(body, "i") });
      }
      if (tags) {
        query.$and.push({ tags: new RegExp(tags, "i") });
      }
    }

    // Fetching blog posts with population of the createdBy field
    const blogs = await BlogModel.find(query).populate({
      path: "createdBy",
      select: "username email avatar",
    });

    // Standardized success response
    return res.status(200).json(
      apiResponse.SUCCESS(
        {
          query,
          count: blogs.length,
          blogs,
        },
        "Blog posts retrieved successfully"
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        apiResponse.OTHER("An error occurred while retrieving blog posts.")
      );
  }
}

export async function getLoggedInUsersBlogPostsControllers(
  req: Request | any,
  res: Response
) {
  try {
    const blogs = await BlogModel.find({ createdBy: req.user.userId }).populate(
      {
        path: "createdBy",
        select: "username email avatar",
      }
    );

    return res.status(200).json(
      apiResponse.SUCCESS(
        {
          count: blogs.length,
          blogs,
        },
        "Blog posts retrieved successfully"
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        apiResponse.OTHER("An error occurred while retrieving blog posts.")
      );
  }
}
