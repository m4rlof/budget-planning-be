import * as planningRepo from "../repositories/planning.repository.js";
import * as financialEntryRepo from "../repositories/financial-entry.repository.js";
import moment from "moment";
import { db } from "../config/db.js";
export async function createPlanning(planning_date, entries) {
    const year = moment(planning_date).year();
    const month = moment(planning_date).month() + 1;
    const total_planned = calculatePlanned(entries);
    return db.transaction(async (trx) => {
        const planningId = await planningRepo.createPlanning(year, month, total_planned, trx);
        const entriesToInsert = entries.map((entry) => ({
            planning_month_id: planningId,
            type: entry.type,
            category_id: entry.category,
            amount: Number(entry.amount),
        }));
        await financialEntryRepo.createFinancialEntries(entriesToInsert, trx);
        const weeks = generateWeeks(planning_date, total_planned, planningId);
        await planningRepo.createPlanningWeeks(weeks, trx);
        return planningId;
    });
}
export async function getMonthPlanningWeeks(planning_month_id) {
    const rows = await planningRepo.getWeeksWithTransactions(planning_month_id);
    return groupWeeks(rows);
}
export async function getMonthPlannings() {
    const plannings = await planningRepo.getAllPlannings();
    return plannings;
}
export function groupWeeks(rows) {
    const map = {};
    rows.forEach((row) => {
        if (!map[row.week_id]) {
            map[row.week_id] = {
                id: row.week_id,
                week_number: row.week_number,
                start_date: row.start_date,
                end_date: row.end_date,
                planned_budget: row.planned_budget,
                actual_spent: row.actual_spent,
                transactions: [],
            };
        }
        if (row.transaction_id) {
            map[row.week_id].transactions.push({
                id: row.transaction_id,
                amount: row.amount,
                category_id: row.category_id,
            });
        }
    });
    return Object.values(map);
}
function calculatePlanned(entries) {
    const result = entries.reduce((acc, entry) => {
        const amount = Number(entry.amount);
        if (entry.type === "income") {
            acc.income += amount;
        }
        if (entry.type === "outcome") {
            acc.outcome += amount;
        }
        return acc;
    }, { income: 0, outcome: 0 });
    result.balance = result.income - result.outcome;
    return result.balance;
}
function generateWeeks(planning_date, totalBudget, planningId) {
    const startOfMonth = moment(planning_date).startOf("month");
    const endOfMonth = moment(planning_date).endOf("month");
    const weeks = [];
    let currentStart = startOfMonth.clone();
    let weekNumber = 1;
    const numberOfWeeks = endOfMonth.week() - startOfMonth.week() + 1;
    const weeklyBudget = Math.floor(totalBudget / numberOfWeeks);
    while (currentStart.isBefore(endOfMonth)) {
        const currentEnd = currentStart.clone().endOf("week");
        weeks.push({
            planning_month_id: planningId,
            week_number: weekNumber,
            start_date: currentStart.toDate(),
            end_date: currentEnd.isAfter(endOfMonth)
                ? endOfMonth.toDate()
                : currentEnd.toDate(),
            planned_budget: weeklyBudget,
            actual_spent: 0,
        });
        currentStart = currentStart.add(1, "week").startOf("week");
        weekNumber++;
    }
    return weeks;
}
