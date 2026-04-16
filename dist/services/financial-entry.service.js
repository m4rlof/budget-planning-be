import * as financialEntryRepo from "../repositories/financial-entry.repository.js";
export async function getFixedTotals() {
    const data = await financialEntryRepo.getFixedTotals();
    return data;
}
