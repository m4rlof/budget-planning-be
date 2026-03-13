import type { Request, Response } from "express";
import * as categoryService from "../services/category.service.js";

export async function getSubcategories(req: Request, res: Response) {
  try {
    const plannings = await categoryService.getSubcategories()

    return res.status(201).json({
      success: true,
      message: "Subcategories fetched successfully",
      data: plannings,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
