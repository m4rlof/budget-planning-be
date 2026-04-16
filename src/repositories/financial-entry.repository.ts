import { db } from "../config/db.js";
import type { TransactionInput } from "../interfaces/transaction.interface.js";

export async function createFinancialEntries(entries: TransactionInput[], trx: any): Promise<void> {
  await trx("financial_entry").insert(entries);
}

export async function getFixedTotals(): Promise<{
  months: Array<{ month: number; year: number; outcomes: Array<{ category: string; amount: number }>; totals: { income: number; outcome: number } }>;
}> {
  // get last 12 planning months
  const lastMonths: any[] = await db("planning_month")
    .select("id", "month", "year")
    .orderBy("year", "desc")
    .orderBy("month", "desc")
    .limit(12);

  const ids = lastMonths.map((m) => m.id);

  // get outcomes grouped by planning_month and category
  const outcomeRows: any[] = await db("financial_entry as fe")
    .join("expense_subcategory as s", "fe.category_id", "s.id")
    .whereIn("fe.planning_month_id", ids || [])
    .andWhere("fe.type", "outcome")
    .select("fe.planning_month_id")
    .select("s.name as category")
    .select("s.icon as icon")
    .sum({ amount: "fe.amount" })
    .groupBy("fe.planning_month_id", "s.name", "s.icon");

  // totals for income and outcome grouped by planning_month
  const monthlyTotalRows: any[] = await db("financial_entry as fe")
    .whereIn("fe.planning_month_id", ids || [])
    .select("fe.planning_month_id")
    .select("fe.type")
    .sum({ amount: "fe.amount" })
    .groupBy("fe.planning_month_id", "fe.type");

  // build months array in chronological order (oldest first)
  const monthsMap: any = {};
  lastMonths.forEach((m) => {
    monthsMap[m.id] = { month: m.month, year: m.year, outcomes: [], totals: { income: 0, outcome: 0 } };
  });

  outcomeRows.forEach((r) => {
    const pmId = r.planning_month_id;
    const cat = r.category;
    const icon = r.icon
    const amount = Number(r.amount) || 0;
    if (monthsMap[pmId]) {
      monthsMap[pmId].outcomes.push({ category: cat, amount, icon });
    }
  });

  monthlyTotalRows.forEach((r) => {
    const pmId = r.planning_month_id;
    const type = r.type;
    const amount = Number(r.amount) || 0;
    if (monthsMap[pmId]) {
      if (type === "income") monthsMap[pmId].totals.income = amount;
      if (type === "outcome") monthsMap[pmId].totals.outcome = amount;
    }
  });

  const months = (Object.values(monthsMap) as any[])
    .sort((a: any, b: any) => (a.year === b.year ? a.month - b.month : a.year - b.year));

  return { months };
}
