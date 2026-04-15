import { db } from "../config/db.js";
import type {
  TransactionInput,
  CategoryAggregate,
} from "../interfaces/transaction.interface.js";

export async function createTransaction(
  transaction: TransactionInput,
  trx: any
): Promise<number> {
  const [row] = await trx("expense_transaction")
    .insert({
      planning_month_id: transaction.planning_month_id,
      planning_week_id: transaction.planning_week_id,
      category_id: transaction.category_id,
      amount: transaction.amount,
    })
    .returning("id");

  return row.id;
}

export async function getCategories(
  planning_month_id: number
): Promise<CategoryAggregate[]> {
  const result = await db("expense_transaction as t")
    .join("expense_subcategory as s", "t.category_id", "s.id")
    .where("t.planning_month_id", planning_month_id)
    .groupBy("t.category_id", "s.name", "s.icon")
    .select("t.category_id", "s.name", "s.icon")
    .sum({ amount: "t.amount" })
    .orderBy("amount", "desc")
    .limit(10);

  return result.map((item: any) => ({
    ...item,
    amount: Number(item.amount),
  }));
}
