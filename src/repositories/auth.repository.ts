import { db } from "../config/db.js";

export async function findUser(user_name: string) {
  return db("user").where({ user_name }).first();
}

export async function createUser(
  user_name: string,
  password: string
): Promise<any> {
  const [id] = await db("user")
    .insert({
      user_name: user_name,
      password: password,
    })
    .returning("id");
  return id;
}
