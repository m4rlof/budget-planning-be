import { db } from "../config/db.js";
import type { TransactionInput } from "../interfaces/transaction.interface.js";

export async function createFinancialEntries(entries: TransactionInput[], trx: any): Promise<void> {
  await trx("financial_entry").insert(entries);
}
