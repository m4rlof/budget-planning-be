export interface Goal {
  id?: number;
  name: string;
  target_amount: number;
  current_amount?: number;
  start_date?: string | Date;
  end_date?: string | Date;
}

export interface GoalTransaction {
  id?: number;
  goal_id: number;
  amount: number;
}

export interface InsightGoal {
  id: number;
  name: string;
}