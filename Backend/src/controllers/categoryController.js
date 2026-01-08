import Category from "../models/Category.js";

// Get All Categories (System + Custom)
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
        console.error("Error fetching categories:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching categories",
            error: error.message
        });
    }
};

// Create Custom Category 
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
        res.status(500).json({ success: false, message: "Error creating category", error: error.message });
    }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findOneAndDelete({
            _id: id,
            userId: req.user.userid 
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found or you do not have permission to delete it"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.error("Delete Category Error:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: error.message
        });
    }
};