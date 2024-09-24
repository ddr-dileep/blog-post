import { Request, Response } from "express";
import apiResponse from "../utils/api-response";

export const registerUserMiddleware = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json(
      apiResponse.error(
        {
          username: username ? undefined : "username is required",
          email: email ? undefined : "email is required",
          password: password ? undefined : "password is required",
        },
        "All fields are required"
      )
    );
  }

  res.send("User registered successfully");
};
