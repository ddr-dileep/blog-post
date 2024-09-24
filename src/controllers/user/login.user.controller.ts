import { Request, Response } from "express";

export default function loginController(req: Request, res: Response) {
  res.sendStatus(200).json({ message: "login successful" });
}
