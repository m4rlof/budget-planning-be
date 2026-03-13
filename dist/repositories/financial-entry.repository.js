import { db } from "../config/db.js";
export async function createFinancialEntries(entries, trx) {
    await trx("financial_entry").insert(entries);
}
