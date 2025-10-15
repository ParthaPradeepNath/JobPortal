require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express()

// Middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET","PUT","POST","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

// connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes)
app.use("/api/jobs", jobRoutes)

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});