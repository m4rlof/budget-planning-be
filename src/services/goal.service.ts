import * as goalRepo from "../repositories/goal.repository.js";

export async function createGoal(goal: any) {
  const goalId = await goalRepo.createGoal(goal);
  return goalId;
}

export async function getGoals() {
  const goals = await goalRepo.getGoals();
  return goals;
}

export async function updateGoal(goal_id: any, contribution_amount: any) {
  const goals = await goalRepo.updateCurrentAmount(
    goal_id,
    contribution_amount
  );
  return goals;
}

export async function createGoalTransaction(
  goal_id: any,
  contribution_amount: any
) {
  const transactionId = await goalRepo.createGoalTransaction(goal_id, contribution_amount)

  await goalRepo.updateCurrentAmount(goal_id, contribution_amount);

  return transactionId;
}

export async function getGoal(goal_id: any) {
  const goals = await goalRepo.getGoal(goal_id);
  return goals;
}
