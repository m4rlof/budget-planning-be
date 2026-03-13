import { db } from "../config/db.js";
import * as transactionRepo from "../repositories/transaction.repository.js";
import * as planningRepo from "../repositories/planning.repository.js";

export async function createTransaction(transaction: any) {
  console.log("Transaction", transaction);

  return db.transaction(async (trx) => {
    const transactionId = await transactionRepo.createTransaction(
      transaction,
      trx
    );

    await planningRepo.updateWeekSpent(transaction, trx);

    return transactionId;
  });
}
