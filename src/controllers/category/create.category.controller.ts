import { Request, Response } from "express";
import apiResponse from "../../utils/api-response";
import CategoryModel from "../../models/category.model";

export default async function createCategoryController(
  req: Request | any,
  res: Response
) {
  try {
    const newCategory: any = new CategoryModel({
      name: req.body.name,
      createdBy: req.user.userId,
    });

    await newCategory.save();

    res
      .status(201)
      .json(
        apiResponse.SUCCESS(
          { category: newCategory },
          "Category created successfully"
        )
      );
  } catch (error) {
    res.status(500).json(apiResponse.OTHER(error));
  }
}
