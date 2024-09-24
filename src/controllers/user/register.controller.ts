import { Request, Response } from "express";

const registerController = async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  res.json({ message: "Form submitted successfully" });
};

export default registerController;
