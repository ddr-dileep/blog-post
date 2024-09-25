import { Request, Response } from "express";
import apiResponse from "../../utils/api-response";
import CategoryModel from "../../models/category.model";

export default async function deleteCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { categoryId } = req.params;

    const existingCategory = await CategoryModel.findById(categoryId);
    if (!existingCategory) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Category not found"));
    }

    await CategoryModel.findByIdAndDelete(categoryId);

    res
      .status(200)
      .json(apiResponse.SUCCESS({}, "Category deleted successfully"));
  } catch (error) {
    res.status(500).json(apiResponse.OTHER(error));
  }
}
