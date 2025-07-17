// src/pages/EatSmart.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Utensils, Clock, TrendingUp } from "lucide-react";

const EatSmart = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({ name: "", calories: "", type: "" });
  const [calorieGoal, setCalorieGoal] = useState(2000);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const profileRes = await axios.get("http://localhost:5001/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (profileRes.data.calorieGoal) setCalorieGoal(profileRes.data.calorieGoal);

        const mealsRes = await axios.get("http://localhost:5001/meals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeals(mealsRes.data);
      } catch (error) {
        console.error("❌ Failed to fetch data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const addMeal = async () => {
    console.log("✅ Add Meal button clicked");
    if (!newMeal.name || !newMeal.calories || !newMeal.type) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const res = await axios.post(
        "http://localhost:5001/meals",
        {
          name: newMeal.name,
          calories: parseInt(newMeal.calories),
          type: newMeal.type,
          date: new Date()
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMeals((prev) => [...prev, res.data.meal]);
      setNewMeal({ name: "", calories: "", type: "" });
    } catch (error) {
      console.error("❌ Failed to add meal:", error.message);
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const progress = Math.min((totalCalories / calorieGoal) * 100, 100);

  const getMealTypeColor = (mealType) => {
    if (!mealType) return 'gray';

    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return 'yellow';
      case 'lunch':
        return 'blue';
      case 'dinner':
        return 'purple';
      case 'snack':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Eat Smart</h1>
        <p className="text-muted-foreground">Track your meals and monitor your nutrition goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Daily Overview
            </CardTitle>
            <CardDescription>Your nutrition progress for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Calories</Label>
                <span className="text-sm font-medium">{totalCalories} / {calorieGoal}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-primary">{totalCalories}</p>
                <p className="text-sm text-muted-foreground">Calories</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-600">65g</p>
                <p className="text-sm text-muted-foreground">Protein</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">120g</p>
                <p className="text-sm text-muted-foreground">Carbs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Meal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Meal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Meal Name</Label>
              <Input
                id="name"
                placeholder="Enter meal name"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="Enter calories"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Meal Type</label>
              <select
                value={newMeal.type}
                onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select meal type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <Button onClick={addMeal} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </CardContent>
        </Card>

        {/* Meal History */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Today's Meals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meals.map((meal) => (
                <div
                  key={meal._id || meal.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Colored dot for meal type */}
                    <div className={`w-3 h-3 rounded-full mt-1 ${getMealTypeColor(meal.type || 'snack')}`} />

                    {/* Meal details */}
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base">
                        {meal.name ? meal.name : 'Unnamed Meal'}
                      </h3>

                      <p className="text-sm text-muted-foreground capitalize">
                        🍽 <strong>Type:</strong> {meal.type ? meal.type : 'unknown'}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        <strong>Time:</strong> { new Date(meal.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>

                  {/* Calories */}
                  <div className="text-right">
                    <Badge variant="secondary">
                      {meal.calories ? `${meal.calories} cal` : `0 cal`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EatSmart;