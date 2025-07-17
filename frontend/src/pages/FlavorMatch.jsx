//src/pages/FlavorMatch.jsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Sparkles, TrendingUp } from "lucide-react";

const FlavorMatch = () => {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [matches, setMatches] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  const flavorProfiles = [
    { name: "Sweet", color: "bg-pink-500" },
    { name: "Savory", color: "bg-orange-500" },
    { name: "Spicy", color: "bg-red-500" },
    { name: "Tangy", color: "bg-yellow-500" },
    { name: "Bitter", color: "bg-green-500" },
    { name: "Umami", color: "bg-purple-500" },
    { name: "Fresh", color: "bg-blue-500" },
    { name: "Smoky", color: "bg-gray-500" },
    { name: "Creamy", color: "bg-indigo-500" },
    { name: "Crunchy", color: "bg-emerald-500" }
  ];

  const toggleFlavor = (flavor) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter(f => f !== flavor));
    } else {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const findMatches = async () => {
    if (selectedFlavors.length === 0) return;

    setAnalyzing(true);

    // Simulate AI flavor matching
    await new Promise(resolve => setTimeout(resolve, 1500));

    const generatedMatches = [
      {
        id: 1,
        name: "Mediterranean Fusion Bowl",
        description: "A perfect blend of fresh herbs, tangy lemon, and creamy tahini",
        compatibility: 95,
        ingredients: ["Grilled chicken", "Quinoa", "Cherry tomatoes", "Cucumber", "Tahini"],
        flavorNotes: selectedFlavors,
        cuisine: "Mediterranean"
      },
      {
        id: 2,
        name: "Spicy Asian Stir-Fry",
        description: "Bold flavors with the perfect balance of heat and umami",
        compatibility: 88,
        ingredients: ["Tofu", "Bok choy", "Bell peppers", "Ginger", "Chili sauce"],
        flavorNotes: selectedFlavors,
        cuisine: "Asian"
      },
      {
        id: 3,
        name: "Smoky BBQ Platter",
        description: "Rich, smoky flavors with a hint of sweetness",
        compatibility: 82,
        ingredients: ["Pulled pork", "Coleslaw", "Corn", "BBQ sauce", "Pickles"],
        flavorNotes: selectedFlavors,
        cuisine: "American"
      }
    ];

    setMatches(generatedMatches);
    setAnalyzing(false);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">FlavorMatch</h1>
        <p className="text-muted-foreground">Discover your perfect flavor combinations and get personalized recipe recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flavor Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Select Flavors
            </CardTitle>
            <CardDescription>What flavors are you craving today?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {flavorProfiles.map((flavor) => (
                <Button
                  key={flavor.name}
                  variant={selectedFlavors.includes(flavor.name) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFlavor(flavor.name)}
                  className="justify-start"
                >
                  <div className={`w-3 h-3 rounded-full ${flavor.color} mr-2`} />
                  {flavor.name}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Selected Flavors:</h4>
              <div className="flex flex-wrap gap-1">
                {selectedFlavors.map((flavor, index) => (
                  <Badge key={index} variant="secondary">
                    {flavor}
                  </Badge>
                ))}
              </div>
              {selectedFlavors.length === 0 && (
                <p className="text-sm text-muted-foreground">No flavors selected</p>
              )}
            </div>

            <Button
              onClick={findMatches}
              disabled={selectedFlavors.length === 0 || analyzing}
              className="w-full"
            >
              {analyzing ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Finding Matches...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Find Flavor Matches
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Flavor Matches */}
        <div className="lg:col-span-2 space-y-4">
          {matches.length > 0 ? (
            matches.map((match) => (
              <Card key={match.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        {match.name}
                      </CardTitle>
                      <CardDescription>{match.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getCompatibilityColor(match.compatibility)}`}>
                        {match.compatibility}%
                      </div>
                      <p className="text-xs text-muted-foreground">Match</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{match.cuisine}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      Trending
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Ingredients:</h4>
                    <div className="flex flex-wrap gap-1">
                      {match.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Flavor Profile:</h4>
                    <div className="flex flex-wrap gap-1">
                      {match.flavorNotes.map((note, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Full Recipe
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">Select some flavors to discover your perfect matches!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlavorMatch;
