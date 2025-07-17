//src/pages/Workouts.jsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Play, Pause, Clock, Flame, Target } from "lucide-react";

const Workouts = () => {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const workoutPlans = [
    {
      id: 1,
      name: "Morning Energy Boost",
      duration: "15 mins",
      difficulty: "Beginner",
      calories: 120,
      exercises: ["Jumping Jacks", "Push-ups", "Squats", "Plank"],
      description: "Quick morning routine to energize your day"
    },
    {
      id: 2,
      name: "Cardio Fat Burn",
      duration: "30 mins",
      difficulty: "Intermediate",
      calories: 280,
      exercises: ["Burpees", "Mountain Climbers", "High Knees", "Jump Rope"],
      description: "High-intensity cardio for maximum calorie burn"
    },
    {
      id: 3,
      name: "Strength Builder",
      duration: "45 mins",
      difficulty: "Advanced",
      calories: 350,
      exercises: ["Deadlifts", "Bench Press", "Squats", "Pull-ups"],
      description: "Build muscle and increase strength"
    }
  ];

  const weeklyStats = {
    workoutsCompleted: 4,
    totalCalories: 720,
    totalTime: 180,
    goal: 5
  };

  const startWorkout = (workout) => {
    setActiveWorkout(workout);
    setWorkoutTime(0);
    setIsRunning(true);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const stopWorkout = () => {
    setActiveWorkout(null);
    setWorkoutTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Workouts</h1>
        <p className="text-muted-foreground">Complement your nutrition with personalized fitness routines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Workouts</span>
                <span className="text-sm">{weeklyStats.workoutsCompleted}/{weeklyStats.goal}</span>
              </div>
              <Progress value={(weeklyStats.workoutsCompleted / weeklyStats.goal) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-500">{weeklyStats.totalCalories}</span>
                </div>
                <p className="text-sm text-muted-foreground">Calories Burned</p>
              </div>

              <div className="text-center p-3 border rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-2xl font-bold text-blue-500">{weeklyStats.totalTime}</span>
                </div>
                <p className="text-sm text-muted-foreground">Minutes Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Workout */}
        {activeWorkout && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                {activeWorkout.name}
              </CardTitle>
              <CardDescription>Current Workout Session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {formatTime(workoutTime)}
                </div>
                <div className="flex justify-center gap-2">
                  <Button onClick={toggleTimer} variant={isRunning ? "destructive" : "default"}>
                    {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isRunning ? "Pause" : "Start"}
                  </Button>
                  <Button onClick={stopWorkout} variant="outline">
                    Stop Workout
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Exercises:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeWorkout.exercises.map((exercise, index) => (
                    <Badge key={index} variant="outline" className="justify-center p-2">
                      {exercise}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Workout Plans */}
        <div className={activeWorkout ? "lg:col-span-3" : "lg:col-span-2"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workoutPlans.map((workout) => (
              <Card key={workout.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{workout.name}</CardTitle>
                      <CardDescription className="text-sm">{workout.description}</CardDescription>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(workout.difficulty)}`} />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {workout.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      {workout.calories} cal
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">{workout.difficulty}</Badge>
                    <div className="space-y-1">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          • {exercise}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => startWorkout(workout)}
                    disabled={activeWorkout !== null}
                    className="w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Workout
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
