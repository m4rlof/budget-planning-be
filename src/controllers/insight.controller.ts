import type { Request, Response } from "express";
import * as categoryService from "../services/category.service.js";
import * as insightService from "../services/insight.service.js";

export async function getMonthlySaving(req: Request, res: Response) {
  try {
    const saving = await insightService.getMonthlySaving();

    return res.status(201).json({
      success: true,
      message: "Savings fetched successfully",
      data: saving,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getExpenseCategory(req: Request, res: Response) {
  try {
    const expenses = await insightService.getExpenseCategory();

    return res.status(201).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
