const express = require("express");
const {
  applyToJob,
  getMyApplications,
  getApplicationById,
  getApplicationForJob,
  updateStatus,
} = require("../controllers/applicationController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const { get } = require("mongoose");

const router = express.Router();

router.post("/:jobId", protect, applyToJob);
router.get("/my", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicationForJob);
router.get("/:id", protect, getApplicationById);
router.put("/:id/status", protect, updateStatus);

module.exports = router;
