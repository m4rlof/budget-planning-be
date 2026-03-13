import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";

export async function login(req: Request, res: Response) {
  try {
    const { user_name, password } = req.body;

    const token = await authService.login(user_name, password);

    return res.status(201).json({
      success: true,
      message: "Month weeks fetched successfully",
      data: { token },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { user_name, password } = req.body;

    const userId = await authService.createUser(user_name, password);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userId,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
