import { Request, Response } from "express";
import { hashedPassword } from "../../utils/bcrypt";
import UserModel from "../../models/user.model";

export default async function registerController(req: Request, res: Response) {
  try {
    const reqBody = {
      ...req.body,
      password: await hashedPassword(req.body.password),
    };

    const user = new UserModel(reqBody);

    res.send(user);
  } catch (error) {
    console.log("error", error);
    res.send("error: ");
  }
}
