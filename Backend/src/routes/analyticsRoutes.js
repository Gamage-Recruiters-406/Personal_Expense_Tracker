import express from "express";
import { getExpenseSummary, getMonthlyTrends } from "../controllers/analyticsController.js";
import { requiredSignIn } from "../middleware/auth.js"; 
import { validateAnalytics } from "../middleware/Validations.js";

const router = express.Router();

router.get("/summary", requiredSignIn, validateAnalytics, getExpenseSummary);
router.get("/trends", requiredSignIn, validateAnalytics, getMonthlyTrends);

export default router;