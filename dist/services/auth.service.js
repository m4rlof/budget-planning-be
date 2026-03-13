import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authRepo from "../repositories/auth.repository.js";
import dotenv from "dotenv";
dotenv.config();
export async function login(user_name, password) {
    const user = await authRepo.findUser(user_name);
    console.log("user", user);
    if (!user)
        return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
        return null;
    const token = jwt.sign({ id: user.id, username: user.user_name }, process.env.JWT_SECRET, { expiresIn: "1y" });
    return token;
}
export async function createUser(user_name, password) {
    const hash = await bcrypt.hash(password, 10);
    const userId = await authRepo.createUser(user_name, hash);
    return userId;
}
