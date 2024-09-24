import { Request, Response } from "express";

export default function getUserInfoController(req: Request, res: Response) {
  res.send("Welcome");
}
