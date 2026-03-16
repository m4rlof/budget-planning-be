import * as categoryRepo from "../repositories/category.repositoriry.js";
import * as planningService from "../services/planning.service.js";

export async function getMonthlySaving() {
  const currentPlanningId = await planningService.getCurrentPlanning();
  const weeksResponse: any = await planningService.getMonthPlanningWeeks(
    currentPlanningId
  );


  console.log("currentPlanningId", currentPlanningId)
  console.log("weeksResponse", weeksResponse)


  const weeks = weeksResponse;

  let totalPlanned = 0;
  let totalSpent = 0;

  for (const week of weeks) {
    totalPlanned += parseFloat(week.planned_budget);
    totalSpent += parseFloat(week.actual_spent);
  }

  const saving = totalPlanned - totalSpent;
  const savingPercentage = totalPlanned > 0 ? (saving / totalPlanned) * 100 : 0;

  return {
    saving,
    savingPercentage: Number(savingPercentage.toFixed(2)),
  };
}
