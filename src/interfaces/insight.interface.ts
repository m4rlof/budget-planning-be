export interface SavingInsight {
  saving: number;
  savingPercentage: number;
}

export interface ExpenseCategoryInsight {
  category_id: number;
  name: string;
  icon: string;
  amount: number;
}

export interface GoalInsight {
  id: number;
  name: string;
}