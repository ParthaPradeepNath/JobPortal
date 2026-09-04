import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware.js';
import { getEmployerAnalytics } from '../controllers/analyticsController.js';

router.get('/overview', protect, getEmployerAnalytics);

export default router;
