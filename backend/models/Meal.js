// backend/models/Meal.js
const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    calories: Number,
    type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    time: String,
    date: { type: Date, default: Date.now }
});

const Meal = mongoose.model("Meal", MealSchema);
module.exports = Meal;