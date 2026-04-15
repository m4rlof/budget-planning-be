import type { Request, Response } from "express";
import * as plannningService from "../services/planning.service.js";

export async function createPlanning(req: Request, res: Response) {
  try {
    const { planning_date, entries } = req.body;
    await plannningService.createPlanning(planning_date, entries);

    return res.status(201).json({
      success: true,
      message: "Planning created successfully",
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMonthPlanningWeeks(req: Request, res: Response) {
  try {
    const planning_month_id = Number(req.params.planning_month_id);

    const monthWeeks = await plannningService.getMonthPlanningWeeks(
      planning_month_id
    );

    return res.status(201).json({
      success: true,
      message: "Month weeks fetched successfully",
      data: monthWeeks,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPlannings(req: Request, res: Response) {
  try {
    const plannings = await plannningService.getMonthPlannings();

    return res.status(201).json({
      success: true,
      message: "Plannings fetched successfully",
      data: plannings,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
