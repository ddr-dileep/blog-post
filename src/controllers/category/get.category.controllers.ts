import { Request, Response } from "express";
import apiResponse from "../../utils/api-response";
import CategoryModel from "../../models/category.model";

export default async function getAllCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { name }: any = req.query;

    const query: any = name ? { name: new RegExp(name, "i") } : {};

    const categories = await CategoryModel.find(query);

    return res
      .status(200)
      .json(
        apiResponse.SUCCESS(
          { count: categories.length, categories },
          "Categories fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse.OTHER("An error occurred while fetching categories."));
  }
}

export async function getCategoryByIdController(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    const category = await CategoryModel.findById(categoryId).populate(
      "createdBy",
      "username email avatar"
    );

    if (!category) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Category not found"));
    }

    return res
      .status(200)
      .json(apiResponse.SUCCESS({ category }, "Category fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse.OTHER("An error occurred while fetching category."));
  }
}
