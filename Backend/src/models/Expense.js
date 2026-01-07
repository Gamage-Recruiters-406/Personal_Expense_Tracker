import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0.01, "Amount must be at least 0.01"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [200, "Description cannot exceed 200 characters"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
        // Allows both predefined and custom categories
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['cash', 'credit_card', 'debit_card', 'upi', 'other'],
            message: "Invalid payment method"
        },
        trim: true
    }
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);
