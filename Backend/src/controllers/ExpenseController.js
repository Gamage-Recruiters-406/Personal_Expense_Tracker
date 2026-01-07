import Expense from "../models/Expense.js";

// CREATE EXPENSE
export const createExpense = async (req, res) => {
    try {
        const { amount, description, category, date, paymentMethod } = req.body;

        // Validation
        if (!amount || !description || !category || !date || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const expense = await Expense.create({
            amount,
            description,
            category,
            date,
            paymentMethod,
            userId: req.user.userid // from auth middleware
        });

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
        });
    } catch (error) {
        console.error("Create expense error:", error);
        res.status(500).json({
            success: false,
            message: "Error creating expense",
            error: error.message
        });
    }
};

// GET ALL EXPENSES (with filtering & pagination)
export const getAllExpenses = async (req, res) => {
    try {
        const { category, startDate, endDate, page = 1, limit = 10 } = req.query;

        const query = { userId: req.user.userid };

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by date range
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const expenses = await Expense.find(query)
            .sort({ date: -1 }) // newest first
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Expense.countDocuments(query);

        res.status(200).json({
            success: true,
            data: {
                expenses,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(count / limit),
                    totalExpenses: count,
                    limit
                }
            }
        });
    } catch (error) {
        console.error("Get expenses error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching expenses",
            error: error.message
        });
    }
};

// GET SINGLE EXPENSE
export const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            userId: req.user.userid
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            data: expense
        });
    } catch (error) {
        console.error("Get expense error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching expense",
            error: error.message
        });
    }
};

// UPDATE EXPENSE
export const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userid },
            req.body,
            { new: true, runValidators: true }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found or unauthorized"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense
        });
    } catch (error) {
        console.error("Update expense error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating expense",
            error: error.message
        });
    }
};

// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userid
        });

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found or unauthorized"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (error) {
        console.error("Delete expense error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting expense",
            error: error.message
        });
    }
};
