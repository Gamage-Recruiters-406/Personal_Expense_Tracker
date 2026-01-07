import express from "express";
import { requiredSignIn } from "../middleware/auth.js";
import {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} from "../controllers/ExpenseController.js";

const Router = express.Router();

// Create Expense
Router.post("/", requiredSignIn, createExpense);

// Get All Expenses
Router.get("/expenses", requiredSignIn, getAllExpenses);

// Get Single Expense
Router.get("/expenses/:id", requiredSignIn, getExpenseById);

// Update Expense
Router.put("/expenses/:id", requiredSignIn, updateExpense);

// Delete Expense
Router.delete("/expenses/:id", requiredSignIn, deleteExpense);

export default Router;