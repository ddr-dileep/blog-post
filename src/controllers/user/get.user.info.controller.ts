import { Request, Response } from "express";
import apiResponse from "../../utils/api-response";
import UserModel from "../../models/user.model";

export default async function getUserInfoController(
  req: Request | any,
  res: Response
) {
  try {
    const user: any = await UserModel.findById(req.user.userId).select(
      "-password -updatedAt -createdAt -__v"
    );

    res
      .status(200)
      .json(apiResponse.SUCCESS({ user }, "User details fetched successfully"));
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
}
