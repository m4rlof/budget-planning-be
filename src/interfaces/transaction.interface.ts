export interface TransactionInput {
  planning_month_id: number;
  planning_week_id: number;
  category_id: number;
  amount: number;
  description?: string;
  transaction_date?: string | Date;
}

export interface CategoryAggregate {
  category_id: number;
  name: string;
  icon: string;
  amount: number;
}