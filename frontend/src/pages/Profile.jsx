// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader,  CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Target, Award, TrendingUp } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5001/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5001/profile", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Profile updated successfully!");
      console.log("Updated user:", res.data.user);
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      alert("Failed to update profile. See console for details.");
    }
  };

  if (loading || !profile) {
    return <div className="p-8">Loading profile...</div>;
  }

  const achievements = [
    { name: "First Week Complete", description: "Tracked meals for 7 days", icon: "🏆", unlocked: true },
    { name: "Calorie Master", description: "Stayed within calorie goal for 10 days", icon: "🎯", unlocked: true },
    { name: "Photo Pro", description: "Used photo estimator 25 times", icon: "📸", unlocked: true },
    { name: "Recipe Creator", description: "Generated 15 leftover recipes", icon: "👨‍🍳", unlocked: false },
    { name: "Fitness Enthusiast", description: "Complete 20 workouts", icon: "💪", unlocked: false },
    { name: "Streak Champion", description: "30-day tracking streak", icon: "🔥", unlocked: false }
  ];

  const stats = {
    totalMeals: 127,
    photosAnalyzed: 34,
    recipesGenerated: 12,
    workoutsCompleted: profile.workoutDays || 0,
    currentStreak: 15
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and track your progress</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.currentStreak}</div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalMeals}</div>
                <p className="text-sm text-muted-foreground">Meals Tracked</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">📸</div>
                <div className="text-2xl font-bold">{stats.photosAnalyzed}</div>
                <p className="text-sm text-muted-foreground">Photos Analyzed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">💪</div>
                <div className="text-2xl font-bold">{stats.workoutsCompleted}</div>
                <p className="text-sm text-muted-foreground">Workouts Done</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Your SmartPlate 360 journey overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Nutrition Tracking</h4>
                  <p className="text-2xl font-bold text-primary">{stats.totalMeals}</p>
                  <p className="text-sm text-muted-foreground">Meals logged successfully</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Recipe Generation</h4>
                  <p className="text-2xl font-bold text-orange-600">{stats.recipesGenerated}</p>
                  <p className="text-sm text-muted-foreground">Creative recipes from leftovers</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Fitness Progress</h4>
                  <p className="text-2xl font-bold text-purple-600">{stats.workoutsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Workouts completed this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={profile.height}
                    onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={profile.weight}
                    onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityControl">Activity Control</Label>
                  <Input
                    id="activity"
                    value={profile.activityControl}
                    onChange={(e) => setProfile({ ...profile, activityControl: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
                <Settings className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Health & Fitness Goals
              </CardTitle>
              <CardDescription>Set and track your personal targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Daily Calorie Goal</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={profile.calorieGoal}
                    onChange={(e) => setProfile({ ...profile, calorieGoal: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workouts">Weekly Workouts</Label>
                  <Input
                    id="workouts"
                    type="number"
                    value={profile.workoutDays}
                    onChange={(e) => setProfile({ ...profile, workoutDays: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water">Daily Water (glasses)</Label>
                  <Input
                    id="water"
                    type="number"
                    value={profile.waterIntake}
                    onChange={(e) => setProfile({ ...profile, waterIntake: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep">Sleep Goal (hours)</Label>
                  <Input
                    id="sleep"
                    type="number"
                    value={profile.sleepGoal}
                    onChange={(e) => setProfile({ ...profile, sleepGoal: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
                <Target className="h-4 w-4 mr-2" />
                Update Goals
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Track your progress and unlock rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${achievement.unlocked
                        ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800"
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.name}</h4>
                        <Badge variant={achievement.unlocked ? "default" : "secondary"} className="text-xs">
                          {achievement.unlocked ? "Unlocked" : "Locked"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;