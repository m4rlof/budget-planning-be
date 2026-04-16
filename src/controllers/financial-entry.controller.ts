import type { Request, Response } from "express";
import * as financialEntryService from "../services/financial-entry.service.js";

export async function getFixedTotals(req: Request, res: Response) {
  try {
    const data = await financialEntryService.getFixedTotals();

    return res.status(200).json({
      success: true,
      message: "Fixed totals fetched successfully",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
