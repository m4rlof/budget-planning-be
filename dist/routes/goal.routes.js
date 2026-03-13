import express from "express";
import * as goalController from "../controllers/goal.controller.js";
const router = express.Router();
router.post("/goal", goalController.createGoal);
router.get("/goals", goalController.getGoals);
router.post("/goal/contribution", goalController.updateGoal);
router.get("/goal/:goal_id", goalController.getGoal);
router.post("/goal/transaction", goalController.updateGoal);
export default router;
