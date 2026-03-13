import express from "express";
import { initDB } from "./config/db.js";
import cors from "cors";
import planningRoutes from "./routes/planning.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import authRoutes from "./routes/auth.route.js";
import goalRoutes from "./routes/goal.routes.js";
const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
async function start() {
    await initDB();
    app.use(express.json());
    app.use("/api/v1", planningRoutes);
    app.use("/api/v1", transactionRoutes);
    app.use("/api/v1", categoryRoutes);
    app.use("/api/v1", authRoutes);
    app.use("/api/v1", goalRoutes);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
}
start();
