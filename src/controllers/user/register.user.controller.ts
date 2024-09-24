import { Request, Response } from "express";
import { hashedPassword } from "../../utils/bcrypt";
import UserModel from "../../models/user.model";
import apiResponse from "../../utils/api-response";

export default async function registerController(req: Request, res: Response) {
  try {
    const reqBody = {
      ...req.body,
      password: await hashedPassword(req.body.password),
    };

    const user: any = new UserModel(reqBody);
    await user.save();

    user.password = undefined; // password is undefined when the user is created

    res.status(201).json(apiResponse.SUCCESS(user));
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
}
