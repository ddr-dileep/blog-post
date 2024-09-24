import { Request, Response } from "express";
import apiResponse from "../../utils/api-response";
import UserModel from "../../models/user.model";
import { comparePasswords } from "../../utils/bcrypt";
import { createToken } from "../../utils/token";

export default async function loginController(req: Request, res: Response) {
  try {
    const existingUser: any = await UserModel.findOne({
      email: req.body.email,
    });
    if (!existingUser) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "User is not exist"));
    }

    const matchingUserPassword = await comparePasswords(
      req.body.password,
      existingUser.password
    );

    if (!matchingUserPassword) {
      return res
        .status(403)
        .json(apiResponse.ERROR("invalid_credentials", "Invalid password"));
    }

    const token = createToken({
      userId: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    });

    res
      .status(200)
      .json(
        apiResponse.SUCCESS(
          { token: token.split("").reverse().join("") },
          "User logged in successfully"
        )
      );
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
}
