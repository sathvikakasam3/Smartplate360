// src/pages/auth/SignUp.jsx

import { useState } from "react";
import SignUpStep1 from "@/components/auth/SignUpStep1";
import SignUpStep2 from "@/components/auth/SignUpStep2";
import SignUpStep3 from "@/components/auth/SignUpStep3";
import SignIn from "./SignIn";

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        weight: "",
        height: "",
        activityControl: "",
        calorieGoal: "",
        workoutDays: "",
        waterIntake: "",
        sleepGoal: "",
        email: "",
        username: "",
        password: "",
    });

    const [hasAccount, setHasAccount] = useState(false);

    const updateFormData = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    if (hasAccount) return <SignIn onBack={() => setHasAccount(false)} />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md w-[90%] max-w-md animate-scale-in">
                {step === 1 && (
                    <SignUpStep1 data={formData} onChange={updateFormData} onNext={handleNext} />
                )}
                {step === 2 && (
                    <SignUpStep2 data={formData} onChange={updateFormData} onNext={handleNext} onBack={handleBack} />
                )}
                {step === 3 && (
                    <SignUpStep3 data={formData} onChange={updateFormData} onBack={handleBack} />
                )}
                <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <button className="text-primary font-medium" onClick={() => setHasAccount(true)}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;