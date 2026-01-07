import express from "express";
import { requiredSignIn } from "../middleware/auth.js";
import {
    createExpense,
    getAllExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    searchExpenses
} from "../controllers/ExpenseController.js";

const Router = express.Router();

// Create Expense
Router.post("/", requiredSignIn, createExpense);

// Get All Expenses
Router.get("/expenses", requiredSignIn, getAllExpenses);

// Search Expenses
Router.get("/expenses/search", requiredSignIn, searchExpenses);

// Get Single Expense
Router.get("/expenses/:id", requiredSignIn, getExpenseById);

// Update Expense
Router.put("/expenses/:id", requiredSignIn, updateExpense);

// Delete Expense
Router.delete("/expenses/:id", requiredSignIn, deleteExpense);

export default Router;