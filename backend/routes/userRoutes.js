const express = require("express");
const {
    updateProfile,
    deleteResume,
    getPublicProfile,
} = require("../controllers/userController.js");
const {protect} = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Protected Routes
router.put("/profile", protect, updateProfile);
router.post("/resume", protect, deleteResume);

// Public Routes
router.get("/:id", getPublicProfile);

module.exports = router;