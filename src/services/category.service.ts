import * as categoryRepo from "../repositories/category.repositoriry.js";

export async function getSubcategories() {
  const subcategories = await categoryRepo.getSubcategories();
  return subcategories;
}
