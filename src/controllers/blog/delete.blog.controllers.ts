import { Request, Response } from "express";
import BlogModel from "../../models/blog.model";
import apiResponse from "../../utils/api-response";

export default async function deleteBlogPostController(
  req: Request | any,
  res: Response
) {
  try {
    // delete blog post if it exists from same user
    const blog: any = await BlogModel.findOne({
      _id: req.params.blogId,
      createdBy: req.user.userId,
    });

    if (!blog) {
      return res
        .status(403)
        .json(
          apiResponse.ERROR(
            "forbidden",
            "You are not authorized to delete this blog post"
          )
        );
    }

    await blog.remove();

    res
      .status(200)
      .json(apiResponse.SUCCESS({}, "Blog post deleted successfully"));
  } catch (error) {
    res.status(500).json(apiResponse.OTHER(error));
  }
}

export async function deleteMultipleBlogPostsController(
  req: Request | any,
  res: Response
) {
  try {
    const blogIds: string[] = req.body.blogIds;

    if (!blogIds || blogIds.length === 0) {
      return res
        .status(400)
        .json(apiResponse.ERROR("invalid_request", "No blog IDs provided"));
    }

    const deletedBlogPosts: any = await BlogModel.deleteMany({
      _id: { $in: blogIds },
    });

    if (deletedBlogPosts.deletedCount === 0) {
      return res
        .status(404)
        .json(
          apiResponse.ERROR(
            "not_found",
            "No blog posts found with provided IDs"
          )
        );
    }

    res.status(200).json(
      apiResponse.SUCCESS(
        {
          count: deletedBlogPosts.deletedCount,
        },
        "Blog posts deleted successfully"
      )
    );
  } catch (error) {
    res.status(500).json(apiResponse.OTHER(error));
  }
}
