import express from "express";
import { getExpenseSummary, getMonthlyTrends } from "../controllers/analyticsController.js";
import { requiredSignIn } from "../middleware/auth.js"; 

const router = express.Router();

router.get("/summary", requiredSignIn, getExpenseSummary);

router.get("/trends", requiredSignIn, getMonthlyTrends);

export default router;