import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api-response";

export const registerUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json(
      apiResponse.ERROR(
        {
          username: username ? undefined : "username is required",
          email: email ? undefined : "email is required",
          password: password ? undefined : "password is required",
        },
        "All fields are required"
      )
    );
  }
  next();
};
