import * as goalService from "../services/goal.service.js";
export async function createGoal(req, res) {
    try {
        const { goal } = req.body;
        const goalId = await goalService.createGoal(goal);
        return res.status(201).json({
            success: true,
            message: "Goal created successfully",
            data: goalId,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function getGoals(req, res) {
    try {
        const goals = await goalService.getGoals();
        return res.status(201).json({
            success: true,
            message: "Goal created successfully",
            data: goals,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function updateGoal(req, res) {
    try {
        const { goal_id, contribution_amount } = req.body;
        const goalId = await goalService.createGoalTransaction(goal_id, contribution_amount);
        return res.status(201).json({
            success: true,
            message: "Goal update successfully",
            data: goalId,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function getGoal(req, res) {
    try {
        const { goal_id } = req.params;
        const goal = await goalService.getGoal(goal_id);
        return res.status(201).json({
            success: true,
            message: "Goal fetched successfully",
            data: goal,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
