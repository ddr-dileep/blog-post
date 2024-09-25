import { Request, Response } from "express";
import apiResponse from "../../utils/api-response";
import CategoryModel from "../../models/category.model";

export default async function updateCategoryController(
  req: Request,
  res: Response
) {
  try {
    const { categoryId } = req.params;
    const updatedCategory: any = await CategoryModel.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Category not found"));
    }

    res
      .status(200)
      .json(
        apiResponse.SUCCESS(
          { category: updatedCategory },
          "Category updated successfully"
        )
      );
  } catch (error) {
    res.status(500).json(apiResponse.OTHER(error));
  }
}
