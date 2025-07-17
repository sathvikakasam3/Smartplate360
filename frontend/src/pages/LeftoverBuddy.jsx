//src/pages/LeftoverBuddy.jsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Plus, Sparkles, Clock, Users } from "lucide-react";

const LeftoverBuddy = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [generating, setGenerating] = useState(false);

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const generateRecipes = async () => {
    if (ingredients.length === 0) return;

    setGenerating(true);

    // Simulate AI recipe generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const generatedRecipes = [
      {
        id: 1,
        name: "Leftover Veggie Stir-Fry",
        description: "A quick and delicious way to use up your leftover vegetables",
        cookTime: "15 mins",
        servings: 2,
        difficulty: "Easy",
        ingredients: ingredients,
        instructions: [
          "Heat oil in a large pan or wok",
          "Add your leftover vegetables and stir-fry for 5-7 minutes",
          "Season with soy sauce, garlic, and ginger",
          "Serve over rice or noodles"
        ]
      },
      {
        id: 2,
        name: "Creative Leftover Soup",
        description: "Transform your leftovers into a hearty, warming soup",
        cookTime: "25 mins",
        servings: 3,
        difficulty: "Medium",
        ingredients: ingredients,
        instructions: [
          "Sauté onions and garlic in a pot",
          "Add your leftover ingredients and broth",
          "Simmer for 15-20 minutes",
          "Season to taste and serve hot"
        ]
      }
    ];

    setRecipes(generatedRecipes);
    setGenerating(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Leftover Buddy</h1>
        <p className="text-muted-foreground">Transform your leftovers into delicious new meals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ingredients Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Ingredients
            </CardTitle>
            <CardDescription>What leftovers do you have?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter ingredient..."
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button onClick={addIngredient} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Your Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    {ingredient} ×
                  </Badge>
                ))}
              </div>
              {ingredients.length === 0 && (
                <p className="text-sm text-muted-foreground">No ingredients added yet</p>
              )}
            </div>

            <Button
              onClick={generateRecipes}
              disabled={ingredients.length === 0 || generating}
              className="w-full"
            >
              {generating ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Recipes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Recipe Results */}
        <div className="lg:col-span-2 space-y-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ChefHat className="h-5 w-5" />
                        {recipe.name}
                      </CardTitle>
                      <CardDescription>{recipe.description}</CardDescription>
                    </div>
                    <Badge>{recipe.difficulty}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.servings} servings
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Using your ingredients:</h4>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Instructions:</h4>
                    <ol className="space-y-1 text-sm">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="font-medium text-primary">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="lg:col-span-2">
              <CardContent className="py-12 text-center">
                <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">Add some ingredients and generate recipes to get started!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftoverBuddy;
