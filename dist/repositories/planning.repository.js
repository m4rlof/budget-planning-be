import { db } from "../config/db.js";
export async function createPlanning(year, month, total_planned, trx) {
    const [row] = await trx("planning_month")
        .insert({
        year,
        month,
        total_planned,
    })
        .returning("id");
    return row.id;
}
export async function updateWeekSpent(transaction, trx) {
    await trx("planning_week")
        .where("id", transaction.planning_week_id)
        .increment("actual_spent", transaction.amount);
}
export async function createPlanningWeeks(weeks, trx) {
    await trx("planning_week").insert(weeks);
}
export async function getWeeksByMonth(planning_month_id) {
    return db("planning_week")
        .select("*")
        .where({ planning_month_id: planning_month_id });
}
export async function getWeeksWithTransactions(planning_month_id) {
    const rows = await db("planning_week as pw")
        .leftJoin("expense_transaction as et", "pw.id", "et.planning_week_id")
        .select("pw.id as week_id", "pw.week_number", "pw.start_date", "pw.end_date", "pw.planned_budget", "pw.actual_spent", "et.id as transaction_id", "et.amount", "et.category_id")
        .where("pw.planning_month_id", planning_month_id)
        .orderBy("pw.week_number");
    return rows;
}
export async function getAllPlannings() {
    const plannings = await db("planning_month")
        .select("*")
        .orderBy("created_at", "desc");
    return plannings;
}
export async function getCurrentPlanning(month, year) {
    return db("planning_month")
        .select("*")
        .where({ year: year, month: month })
        .first("id");
}
