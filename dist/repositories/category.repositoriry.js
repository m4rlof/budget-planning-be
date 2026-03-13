import { db } from "../config/db.js";
export async function getSubcategories() {
    const plannings = await db("expense_subcategory").select("*");
    return plannings;
}
