import express from "express";
import * as insightController from "../controllers/insight.controller.js";
const router = express.Router();
router.get("/insights/monthly-saving", insightController.getMonthlySaving);
router.get("/insights/expense-category", insightController.getExpenseCategory);
router.get("/insights/goals", insightController.getGoals);
router.get("/insights/goal/:id", insightController.getGoal);
export default router;
