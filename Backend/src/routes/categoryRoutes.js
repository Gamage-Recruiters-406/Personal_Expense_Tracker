import express from "express";
import { createCategory, getAllCategories, deleteCategory } from "../controllers/categoryController.js";
import { requiredSignIn } from "../middleware/auth.js"; 
import { validateCategory } from "../middleware/Validations.js";

const router = express.Router();

router.get("/get-all", requiredSignIn, getAllCategories);

router.post("/create", requiredSignIn, validateCategory, createCategory);

router.delete("/delete/:id", requiredSignIn, deleteCategory);

export default router;