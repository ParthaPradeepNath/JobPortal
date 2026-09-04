import express from 'express';
const router = express.Router();
import { protect } from '../middlewares/authMiddleware.js';
import { saveJob, unsaveJob, getMySavedJobs } from '../controllers/savedJobController.js';

router.post('/:jobId', protect, saveJob);
router.delete('/:jobId', protect, unsaveJob);
router.get('/my', protect, getMySavedJobs);

export default router;
