import * as transactionRepo from "../repositories/transaction.repository.js";
import * as goalRepo from "../repositories/goal.repository.js";
import * as planningService from "../services/planning.service.js";

import type {
  SavingInsight,
  ExpenseCategoryInsight,
  GoalInsight,
} from "../interfaces/insight.interface.js";

export async function getMonthlySaving(): Promise<SavingInsight> {
  const currentPlanningId = await planningService.getCurrentPlanning();
  const weeksResponse = await planningService.getMonthPlanningWeeks(
    currentPlanningId
  ); // PlanningWeek[]

  const weeks = weeksResponse;

  let totalPlanned = 0;
  let totalSpent = 0;

  for (const week of weeks) {
    totalPlanned += parseFloat(String(week.planned_budget));
    totalSpent += parseFloat(String(week.actual_spent));
  }

  const saving = totalPlanned - totalSpent;
  const savingPercentage = totalPlanned > 0 ? (saving / totalPlanned) * 100 : 0;

  return {
    saving,
    savingPercentage: Number(savingPercentage.toFixed(2)),
  };
}

export async function getExpenseCategory(): Promise<ExpenseCategoryInsight[]> {
  const currentPlanningId = await planningService.getCurrentPlanning();
  const categories = await transactionRepo.getCategories(currentPlanningId);

  return categories;
}

export async function getGoals(): Promise<GoalInsight[]> {
  const goals = await goalRepo.getInsightGoals();

  return goals;
}

export async function getGoal(id: number): Promise<any> {
  const goal = await goalRepo.getInsightGoal(id);

  return goal;
}
