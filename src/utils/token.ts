import JSON_WEB_TOKEN from "jsonwebtoken";
import apiResponse from "./api-response";
import { NextFunction, Request, Response } from "express";

export const createToken = (data: any) => {
  const token = JSON_WEB_TOKEN.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });

  return token;
};

export const authTokenMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json(apiResponse.ERROR("unauthorized", "Token not found"));
  }

  token = token.split("").reverse().join("");

  try {
    const decoded = JSON_WEB_TOKEN.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(apiResponse.ERROR("unauthorized", "Invalid token"));
  }
};
