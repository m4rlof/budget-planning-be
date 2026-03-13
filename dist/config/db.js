import knex from "knex";
import dotenv from "dotenv";
dotenv.config();
let connectionConfig;
if (process.env.ENVIRONMENT === "production") {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not set");
    }
    connectionConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    };
}
else {
    console.log("aqui", process.env.DB);
    connectionConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        port: Number(process.env.DB_PORT) || 5432,
    };
}
export const db = knex({
    client: "pg",
    connection: connectionConfig,
    pool: { min: 2, max: 10 },
});
export async function initDB() {
    const existsPlanning = await db.schema.hasTable("planning_month");
    if (!existsPlanning) {
        await db.schema.createTable("planning_month", (table) => {
            table.increments("id").primary();
            table.integer("year");
            table.integer("month");
            table.integer("total_planned");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsIncome = await db.schema.hasTable("income");
    if (!existsIncome) {
        await db.schema.createTable("income", (table) => {
            table.increments("id").primary();
            table.integer("planning_month_id");
            table.text("description");
            table.integer("amount");
            table.text("type");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsPlannedExpense = await db.schema.hasTable("planned_expense");
    if (!existsPlannedExpense) {
        await db.schema.createTable("planned_expense", (table) => {
            table.increments("id").primary();
            table.integer("planning_month_id");
            table.integer("category_id");
            table.text("description");
            table.integer("amount");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsExpenseCategory = await db.schema.hasTable("expense_category");
    if (!existsExpenseCategory) {
        await db.schema.createTable("expense_category", (table) => {
            table.increments("id").primary();
            table.text("name");
            table.text("icon");
            table.text("color");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsExpenseSubCategory = await db.schema.hasTable("expense_subcategory");
    if (!existsExpenseSubCategory) {
        await db.schema.createTable("expense_subcategory", (table) => {
            table.increments("id").primary();
            table.integer("expense_category_id");
            table.text("name");
            table.text("icon");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsPlanningWeek = await db.schema.hasTable("planning_week");
    if (!existsPlanningWeek) {
        await db.schema.createTable("planning_week", (table) => {
            table.increments("id").primary();
            table.integer("planning_month_id");
            table.integer("week_number");
            table.timestamp("start_date");
            table.timestamp("end_date");
            table.integer("planned_budget");
            table.integer("actual_spent");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsExpenseTransaction = await db.schema.hasTable("expense_transaction");
    if (!existsExpenseTransaction) {
        await db.schema.createTable("expense_transaction", (table) => {
            table.increments("id").primary();
            table.integer("planning_month_id");
            table.integer("planning_week_id");
            table.integer("category_id");
            table.text("description");
            table.integer("amount");
            table.timestamp("transaction_date");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsFinancialEntry = await db.schema.hasTable("financial_entry");
    if (!existsFinancialEntry) {
        await db.schema.createTable("financial_entry", (table) => {
            table.increments("id").primary();
            table.integer("planning_month_id");
            table.text("type");
            table.integer("category_id");
            table.text("description");
            table.integer("amount");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsUser = await db.schema.hasTable("user");
    if (!existsUser) {
        await db.schema.createTable("user", (table) => {
            table.increments("id").primary();
            table.text("user_name");
            table.text("password");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existGoal = await db.schema.hasTable("goal");
    if (!existGoal) {
        await db.schema.createTable("goal", (table) => {
            table.increments("id").primary();
            table.text("name");
            table.integer("target_amount");
            table.integer("current_amount").defaultTo(0);
            table.timestamp("start_date");
            table.timestamp("end_date");
            table.text("status").defaultTo("active");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
    const existsGoalTransaction = await db.schema.hasTable("goal_transaction");
    if (!existsGoalTransaction) {
        await db.schema.createTable("goal_transaction", (table) => {
            table.increments("id").primary();
            table.integer("goal_id");
            table.integer("amount");
            table.timestamp("created_at").defaultTo(db.fn.now());
            table.timestamp("updated_at").defaultTo(db.fn.now());
        });
    }
}
