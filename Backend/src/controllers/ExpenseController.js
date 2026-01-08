import Expense from "../models/Expense.js";
import { handleError } from "../middleware/errorHandler.js";

// CREATE EXPENSE
export const createExpense = async (req, res) => {
    try {
        const { amount, description, category, date, paymentMethod } = req.body;

        // Validation handled by middleware


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
        handleError(res, error, "Error creating expense");
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
        handleError(res, error, "Error fetching expenses");
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
        handleError(res, error, "Error fetching expense");
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
        handleError(res, error, "Error updating expense");
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
        handleError(res, error, "Error deleting expense");
    }
};


// SEARCH EXPENSES (Separate function)

export const searchExpenses = async (req, res) => {
    try {
        const { search, category, startDate, endDate, timeRange, page = 1, limit = 10 } = req.query;

        const query = { userId: req.user.userid };

        // Search by description (regex)
        if (search) {
            query.description = { $regex: search, $options: "i" };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Date Filtering Logic
        if (timeRange === 'last30') {
            const d = new Date();
            d.setDate(d.getDate() - 30);
            query.date = { $gte: d };

        }
        else if (timeRange === 'currentMonth') {
            const start = new Date();
            start.setDate(1); // First day of current month
            //start.setHours(0, 0, 0, 0);

            const end = new Date();
            end.setMonth(end.getMonth() + 1);
            end.setDate(0); // Last day of current month
            //end.setHours(23, 59, 59, 999);

            query.date = { $gte: start, $lte: end };


        } else if (startDate || endDate) {
            // Custom Range
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const expenses = await Expense.find(query)
            .sort({ date: -1 })
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
        handleError(res, error, "Error searching expenses");
    }
};