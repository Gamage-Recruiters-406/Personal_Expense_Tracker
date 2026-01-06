import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { requiredSignIn } from '../middleware/auth.js';

const router = express.Router()

router.post("/registerUser", registerUser);
router.post("/login", loginUser);

export default router;