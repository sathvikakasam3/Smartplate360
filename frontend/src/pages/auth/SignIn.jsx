// src/pages/auth/SignIn.jsx

import { useState } from "react";
import axios from "axios";

const SignIn = ({ onBack }) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5001/login", credentials);
            const { token, user } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            alert("Login successful!");

            window.location.href = "/profile"; // or set auth state
        } catch (err) {
            alert("Login failed: " + err.response?.data?.error || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md w-[90%] max-w-md animate-scale-in">
                {/* your form content */}
                <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>
                <div className="space-y-4">
                    <input
                        placeholder="Username"
                        className="w-full input"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full input"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                </div>
                <div className="flex justify-between mt-6">
                    <button className="btn-secondary" onClick={onBack}>Back</button>
                    <button className="btn-primary" onClick={handleLogin}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;