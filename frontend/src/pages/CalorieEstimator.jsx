import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap, Info } from "lucide-react";

const CalorieEstimator = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeFood = async () => {
    if (!query) return;
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(`http://127.0.0.1:5002/api/nutrition?query=${query}`);
      const data = await response.json();

      if (response.ok) {
        const formattedResults = data.map(item => ({
          name: item.name,
          calories: item["Calories (kcal)"],
          protein: item["Protein (g)"],
          carbs: item["Carbohydrates (g)"],
          fat: item["Fats (g)"],
          fiber: item["Fibre (g)"]
        }));
        setResults(formattedResults);
      } else {
        setResults([{ error: data.error || "Dish not found" }]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setResults([{ error: "Failed to fetch data. Server might be down." }]);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Calorie Estimator</CardTitle>
          <CardDescription>Type a dish name (e.g., dosa, tea, mango)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter food name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={analyzeFood} disabled={loading || !query}>
            {loading ? "Analyzing..." : "Estimate Calories"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Analysis Results
          </CardTitle>
          <CardDescription>Nutrition breakdown (per 100g)</CardDescription>
        </CardHeader>
        <CardContent>
          {results ? (
            results[0]?.error ? (
              <p className="text-red-600 font-semibold text-center">{results[0].error}</p>
            ) : (
              <div className="space-y-6">
                {results.map((item, idx) => (
                  <div key={idx} className="border p-4 rounded-lg space-y-2 bg-gray-50">
                    <h3 className="text-xl font-semibold text-primary">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">(Per 100g)</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="p-2 border rounded text-center">
                        <p className="font-bold">{item.calories} kcal</p>
                        <p className="text-xs text-muted-foreground">Calories</p>
                      </div>
                      <div className="p-2 border rounded text-center">
                        <p className="font-bold">{item.protein} g</p>
                        <p className="text-xs text-muted-foreground">Protein</p>
                      </div>
                      <div className="p-2 border rounded text-center">
                        <p className="font-bold">{item.carbs} g</p>
                        <p className="text-xs text-muted-foreground">Carbs</p>
                      </div>
                      <div className="p-2 border rounded text-center">
                        <p className="font-bold">{item.fat} g</p>
                        <p className="text-xs text-muted-foreground">Fat</p>
                      </div>
                      <div className="p-2 border rounded text-center">
                        <p className="font-bold">{item.fiber} g</p>
                        <p className="text-xs text-muted-foreground">Fiber</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="text-muted-foreground text-center">Enter a dish to see results</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalorieEstimator;