import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const SignUpStep3 = ({ data, onChange, onBack }) => {
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            console.log("Submitting data to server:", data);
            const res = await axios.post("http://localhost:5001/register", data, {
                withCredentials: true
            });
            alert("Registration successful!");
            navigate("/login"); // or "/index" or any route
        } catch (err) {
            const message =
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                "Unknown error";
            alert("Error: " + message);
        }
    };

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Account Info</h2>
            <div className="space-y-4">
                <input
                    value={data.email}
                    onChange={(e) => onChange({ email: e.target.value })}
                    placeholder="Email"
                    className="w-full input"
                />
                <input
                    value={data.username}
                    onChange={(e) => onChange({ username: e.target.value })}
                    placeholder="Username"
                    className="w-full input"
                />
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => onChange({ password: e.target.value })}
                    placeholder="Password"
                    className="w-full input"
                />
            </div>
            <div className="flex justify-between mt-6">
                <button className="btn-secondary" onClick={onBack}>Back</button>
                <button className="btn-primary" onClick={handleSubmit}>Sign Up</button>
            </div>
        </>
    );
}; 
export default SignUpStep3;