import { Router } from 'express';
import { pool } from '../config/db.js';
import { AuthController } from '../controllers/auth.controller.js';
import { UserModel } from '../models/UserModel.js';
import { AuthService } from '../services/auth.service.js';

const router = Router();

const userModel = new UserModel(pool);
const authService = new AuthService(userModel);
const authController = new AuthController(authService);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
