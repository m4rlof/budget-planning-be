import * as authService from "../services/auth.service.js";
export async function login(req, res) {
    try {
        const { user_name, password } = req.body;
        const token = await authService.login(user_name, password);
        return res.status(201).json({
            success: true,
            message: "Month weeks fetched successfully",
            data: { token },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export async function createUser(req, res) {
    try {
        const { user_name, password } = req.body;
        const userId = await authService.createUser(user_name, password);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: userId,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
