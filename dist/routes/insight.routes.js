import express from "express";
import * as insightController from "../controllers/insight.controller.js";
const router = express.Router();
router.get("/insights/monthly-saving", insightController.getMonthlySaving);
router.get("/insights/expense-category", insightController.getExpenseCategory);
export default router;
