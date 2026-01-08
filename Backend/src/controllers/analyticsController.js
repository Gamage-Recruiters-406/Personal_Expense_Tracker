import Expense from "../models/Expense.js";
import mongoose from "mongoose";
// 👇 NEW IMPORT
import { handleError500 } from "../middleware/errorHandler.js";

// GET ANALYTICS SUMMARY
export const getExpenseSummary = async (req, res) => {
    try {
        const { userid } = req.user;
        
        const today = new Date();
        const start = req.query.startDate 
            ? new Date(req.query.startDate) 
            : new Date(today.getFullYear(), today.getMonth(), 1); 
            
        const end = req.query.endDate 
            ? new Date(req.query.endDate) 
            : new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59); 

        const stats = await Expense.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userid),
                    date: { $gte: start, $lte: end }
                }
            },
            {
                $facet: {
                    byCategory: [
                        { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } }
                    ],
                    byPaymentMethod: [
                        { $group: { _id: "$paymentMethod", total: { $sum: "$amount" }, count: { $sum: 1 } } }
                    ],
                    overall: [
                        { $group: { _id: null, totalExpenses: { $sum: "$amount" }, expenseCount: { $sum: 1 } } }
                    ]
                }
            }
        ]);

        const results = stats[0];
        const overall = results.overall[0] || { totalExpenses: 0, expenseCount: 0 };
        const totalExpenses = overall.totalExpenses;
        const expenseCount = overall.expenseCount;
        
        const averageExpense = expenseCount > 0 
            ? (totalExpenses / expenseCount).toFixed(2) 
            : 0;

        const formatData = (list, keyName) => {
            return list.map(item => ({
                [keyName]: item._id, 
                total: item.total,
                count: item.count,
                percentage: totalExpenses > 0 
                    ? Math.round((item.total / totalExpenses) * 100) 
                    : 0
            })).sort((a, b) => b.total - a.total); 
        };

        res.status(200).json({
            success: true,
            data: {
                totalExpenses,
                expenseCount,
                averageExpense: Number(averageExpense),
                byCategory: formatData(results.byCategory, "category"),
                byPaymentMethod: formatData(results.byPaymentMethod, "method")
            }
        });

    } catch (error) {
        // 👇 UPDATED Usage
        handleError500(res, error, "Error fetching analytics summary");
    }
};

// GET MONTHLY TRENDS
export const getMonthlyTrends = async (req, res) => {
    try {
        const { userid } = req.user;
        
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const trends = await Expense.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userid),
                    date: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const formattedTrends = trends.map(item => {
            const date = new Date(item._id.year, item._id.month - 1); 
            return {
                month: date.toLocaleString('default', { month: 'short', year: 'numeric' }), 
                amount: item.totalAmount
            };
        });

        res.status(200).json({
            success: true,
            data: formattedTrends
        });

    } catch (error) {
        // 👇 UPDATED Usage
        handleError500(res, error, "Error fetching monthly trends");
    }
};