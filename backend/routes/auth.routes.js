import express from 'express';
import { login, register, whoami } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/whoami', authMiddleware, whoami);

export default router;