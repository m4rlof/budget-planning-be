export interface PlanningMonth {
  id: number;
  year: number;
  month: number;
  total_planned: number;
  created_at?: string;
  updated_at?: string;
}

export interface PlanningWeek {
  id?: number;
  planning_month_id: number;
  week_number: number;
  start_date: string | Date;
  end_date: string | Date;
  planned_budget: number;
  actual_spent: number;
}

export interface WeekWithTransactions extends PlanningWeek {
  transactions: TransactionOverview[];
}

export interface TransactionOverview {
  id: number;
  amount: number;
  category_id: number;
  planned_budget: number;
  actual_spent: number
}