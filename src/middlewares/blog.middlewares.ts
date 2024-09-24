import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api-response";

export const createBlogPostMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json(
      apiResponse.ERROR({
        title: title ? undefined : "title is required",
        body: body ? undefined : "body/content is required",
      })
    );
  }

  next();
};
