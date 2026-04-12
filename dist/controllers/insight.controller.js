import * as categoryService from "../services/category.service.js";
import * as insightService from "../services/insight.service.js";
export async function getMonthlySaving(req, res) {
    try {
        const saving = await insightService.getMonthlySaving();
        return res.status(201).json({
            success: true,
            message: "Savings fetched successfully",
            data: saving,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function getExpenseCategory(req, res) {
    try {
        const expenses = await insightService.getExpenseCategory();
        return res.status(201).json({
            success: true,
            message: "Expenses fetched successfully",
            data: expenses,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
