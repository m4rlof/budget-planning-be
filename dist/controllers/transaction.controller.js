import * as transactionService from "../services/transaction.service.js";
export async function createTransaction(req, res) {
    try {
        const { transaction } = req.body;
        await transactionService.createTransaction(transaction);
        return res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            data: {},
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
