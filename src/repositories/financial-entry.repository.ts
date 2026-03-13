import { db } from "../config/db.js";

export async function createFinancialEntries(entries: any, trx: any) {
  await trx("financial_entry").insert(entries);
}
