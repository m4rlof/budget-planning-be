import express from "express";
import * as financialEntryController from "../controllers/financial-entry.controller.js";
const router = express.Router();
router.get("/financial-entries/fixed-totals", financialEntryController.getFixedTotals);
export default router;
