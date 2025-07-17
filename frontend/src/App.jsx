// src/App.jsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import SignUp from "./pages/auth/SignUp";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import EatSmart from "./pages/EatSmart";
import CalorieEstimator from "./pages/CalorieEstimator";
import LeftoverBuddy from "./pages/LeftoverBuddy";
import FlavorMatch from "./pages/FlavorMatch";
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignUpPage from "./pages/auth/SignUp";
import SignInPage from "./pages/auth/SignIn";



const queryClient = new QueryClient();

function App() {
  const [showAuthModal, setShowAuthModal] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="smartplate-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/" element={<SignUpPage />} />
                <Route path="/home" element={<Index />} /> 
                <Route path="/eat-smart" element={<EatSmart />} />
                <Route path="/calorie-estimator" element={<CalorieEstimator />} />
                <Route path="/leftover-buddy" element={<LeftoverBuddy />} />
                <Route path="/flavor-match" element={<FlavorMatch />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;