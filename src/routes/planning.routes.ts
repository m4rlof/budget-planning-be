import express from "express";
import * as planningController from "../controllers/planning.controller.js";

const router = express.Router();

router.post("/planning/create", planningController.createPlanning);
router.get("/planning/:planning_month_id", planningController.getMonthPlanningWeeks);
router.get("/plannings", planningController.getPlannings);

export default router;
