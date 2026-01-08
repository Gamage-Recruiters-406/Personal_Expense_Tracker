import Category from "../models/Category.js";
// 👇 NEW IMPORTS to match your file
import { handleError500, handleError404 } from "../middleware/errorHandler.js"; 

// Get All Categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({
            $or: [
                { userId: null },
                { userId: req.user.userid }
            ]
        });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories 
        });
    } catch (error) {
        // 👇 Use 500 for server errors
        handleError500(res, error, "Error fetching categories");
    }
};

// Create Category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        const newCategory = await Category.create({
            name,
            userId: req.user.userid 
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error) {
        if (error.code === 11000) {
             return res.status(400).json({ success: false, message: "You already have this category" });
        }
        // 👇 Use 500 for server errors
        handleError500(res, error, "Error creating category");
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findOneAndDelete({
            _id: id,
            userId: req.user.userid 
        });

        if (!category) {
            // 👇 NEW: Use your 404 handler here!
            return handleError404(res, "Category not found or you do not have permission to delete it");
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        // 👇 Use 500 for server errors
        handleError500(res, error, "Error deleting category");
    }
};