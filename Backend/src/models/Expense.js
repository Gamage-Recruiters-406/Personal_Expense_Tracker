import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: {
        type: Number
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    date: {
        type: Date
    },
    paymentMethod: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);
