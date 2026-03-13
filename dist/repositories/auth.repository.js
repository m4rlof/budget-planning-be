import { db } from "../config/db.js";
export async function findUser(user_name) {
    return db("user").where({ user_name }).first();
}
export async function createUser(user_name, password) {
    const [id] = await db("user")
        .insert({
        user_name: user_name,
        password: password,
    })
        .returning("id");
    return id;
}
