import type { Request, Response } from "express";
import * as transactionService from "../services/transaction.service.js";

export async function createTransaction(req: Request, res: Response) {
  try {
    const { transaction } = req.body;
    await transactionService.createTransaction(transaction);

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
