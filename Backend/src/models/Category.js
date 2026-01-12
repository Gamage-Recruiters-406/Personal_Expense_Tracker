import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    icon: {
        type: String, 
        default: "default-icon"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


categorySchema.index({ name: 1, userId: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);