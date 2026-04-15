export interface FinancialEntryInput {
  type: "income" | "outcome";
  category: number;
  amount: number;
  description?: string;
}

export interface FinancialEntryInsert {
  planning_month_id: number;
  type: string;
  category_id: number;
  amount: number;
  description?: string;
}
