import { db } from "../config/db.js";
import * as transactionRepo from "../repositories/transaction.repository.js";
import * as planningRepo from "../repositories/planning.repository.js";

import type { TransactionInput } from "../interfaces/transaction.interface.js";

export async function createTransaction(transaction: TransactionInput) {
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
