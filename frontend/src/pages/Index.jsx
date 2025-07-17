//src/pages/Index.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Utensils, ChefHat, Heart, Dumbbell, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      title: "Eat Smart",
      description: "Track your meals with intelligent nutrition insights",
      icon: Utensils,
      href: "/eat-smart",
      color: "bg-green-500"
    },
    {
      title: "Calorie Estimator",
      description: "Snap a photo to estimate calories instantly",
      icon: Camera,
      href: "/calorie-estimator",
      color: "bg-blue-500"
    },
    {
      title: "Leftover Buddy",
      description: "Transform leftovers into delicious new meals",
      icon: ChefHat,
      href: "/leftover-buddy",
      color: "bg-orange-500"
    },
    {
      title: "FlavorMatch",
      description: "Discover your perfect flavor combinations",
      icon: Heart,
      href: "/flavor-match",
      color: "bg-red-500"
    },
    {
      title: "Workouts",
      description: "Complement your nutrition with fitness tracking",
      icon: Dumbbell,
      href: "/workouts",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          SmartPlate 360°
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Your comprehensive nutrition and wellness companion. Track, analyze, and optimize your health journey with AI-powered insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="min-w-[200px]">
            <Link to="/eat-smart">
              <Utensils className="mr-2 h-5 w-5" />
              Start Tracking
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="min-w-[200px]">
            <Link to="/calorie-estimator">
              <Camera className="mr-2 h-5 w-5" />
              Estimate Calories
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Link to={feature.href}>
                  Explore {feature.title}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-primary">10K+</span>
              </div>
              <p className="text-muted-foreground">Meals Tracked</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Camera className="h-8 w-8 text-secondary mr-2" />
                <span className="text-3xl font-bold text-secondary">5K+</span>
              </div>
              <p className="text-muted-foreground">Photos Analyzed</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Heart className="h-8 w-8 text-accent mr-2" />
                <span className="text-3xl font-bold text-accent">95%</span>
              </div>
              <p className="text-muted-foreground">User Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;