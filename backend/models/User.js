//backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    weight: Number,
    height: Number,
    activityControl: String,
    calorieGoal: Number,
    workoutDays: Number,
    waterIntake: Number,
    sleepGoal: Number,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
}, { timestamps: true });


const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;