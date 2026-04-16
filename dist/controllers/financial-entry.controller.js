import * as financialEntryService from "../services/financial-entry.service.js";
export async function getFixedTotals(req, res) {
    try {
        const data = await financialEntryService.getFixedTotals();
        return res.status(200).json({
            success: true,
            message: "Fixed totals fetched successfully",
            data,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
