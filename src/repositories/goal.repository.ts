import { db } from "../config/db.js";

export async function createGoal(goal: any): Promise<any> {
  const [id] = await db("goal")
    .insert({
      name: goal.name,
      target_amount: goal.target_amount,
      start_date: goal.start_date,
      end_date: goal.end_date,
    })
    .returning("id");
  return id;
}

export async function getGoals(): Promise<any> {
  const goals = await db("goal").select("*");
  return goals;
}

export async function updateCurrentAmount(
  goal_id: any,
  contribution_amount: any
) {
  const [id] = await db("goal")
    .where("id", goal_id)
    .increment("current_amount", contribution_amount)
    .returning("id");

  return id;
}

export async function createGoalTransaction(
  goal_id: any,
  contribution_amount: any
): Promise<any> {
  const [id] = await db("goal_transaction")
    .insert({
      goal_id: goal_id,
      amount: contribution_amount,
    })
    .returning("id");
  return id;
}

// export async function getGoal(goal_id: any): Promise<any> {
//   const goal = await db("goal").select("*").where({ id: goal_id }).first();
//   return goal;
// }

export async function getGoal(goal_id: any): Promise<any> {
  const goal = await db("goal").where({ id: goal_id }).first();

  const transactions = await db("goal_transaction").where({ goal_id });

  return {
    ...goal,
    transactions,
  };
}
