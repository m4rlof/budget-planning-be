export async function createTransaction(transaction: any, trx: any) {
  const [row] = await trx("expense_transaction")
    .insert({
      planning_month_id: transaction.planning_month_id,
      planning_week_id: transaction.planning_week_id,
      category_id: transaction.category_id,
      amount: transaction.amount,
    })
    .returning("id");

  return row.id;
}
