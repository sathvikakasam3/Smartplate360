//backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const Meal = require("./models/Meal"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const axios = require('axios');
const fs = require('fs');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.options("*", cors({ origin: "http://localhost:8080", credentials: true }));
app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        console.log("Register route hit with data:", req.body); 
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ ...rest, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get("/profile", async (req, res) => {
    console.log("✅ /profile route hit");
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put("/profile", async (req, res) => {
    try {
        console.log("✅ PUT /profile route hit");

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const fieldsToUpdate = [
            "fullName", "email", "age", "height", "weight", "activityControl",
            "calorieGoal", "workoutDays", "waterIntake", "sleepGoal"
        ];

        fieldsToUpdate.forEach((field) => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error("Error in PUT /profile:", err.message);
        res.status(400).json({ error: err.message });
    }
});

// New route to connect MERN backend with Flask nutrition microservice
app.get("/api/nutrition", async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: "Missing query parameter" });
    }

    try {
        const response = await axios.get(`http://localhost:5001/api/nutrition?query=${encodeURIComponent(query)}`);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching nutrition data:", error.message);
        res.status(500).json({ error: "Failed to fetch nutrition data" });
    }
});

app.post("/meals", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { name, calories, type, date } = req.body;

        const meal = new Meal({
            userId: decoded.id,
            name,
            calories,
            type,
            date: date || new Date(), // Use current date-time if not provided
        });

        await meal.save();

        res.status(201).json({ message: "Meal logged", meal });
    } catch (err) {
        console.error("❌ Error creating meal:", err.message);
        res.status(400).json({ error: err.message });
    }
});

app.get("/meals", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const meals = await Meal.find({ userId: decoded.id }).sort({ date: -1 });

        res.json(meals);
    } catch (err) {
        console.error("❌ Error fetching meals:", err.message);
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));