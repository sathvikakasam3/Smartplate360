// src/components/auth/SignUpStep2.jsx
const SignUpStep2 = ({ data, onChange, onNext, onBack }) => (
    <>
        <h2 className="text-xl font-semibold mb-4">Lifestyle Preferences</h2>
        <div className="space-y-4">
            <input value={data.activityControl} onChange={(e) => onChange({ activityControl: e.target.value })} placeholder="Activity Control(high/medium/low)" className="w-full input" />
            <input value={data.calorieGoal} onChange={(e) => onChange({ calorieGoal: e.target.value })} placeholder="Daily Calorie Goal(in kcal)" className="w-full input" />
            <input value={data.workoutDays} onChange={(e) => onChange({ workoutDays: e.target.value })} placeholder="Weekly Workouts (days)" className="w-full input" />
            <input value={data.waterIntake} onChange={(e) => onChange({ waterIntake: e.target.value })} placeholder="Daily Water Intake (glasses)" className="w-full input" />
            <input value={data.sleepGoal} onChange={(e) => onChange({ sleepGoal: e.target.value })} placeholder="Sleep Goal (hours)" className="w-full input" />
        </div>
        <div className="flex justify-between mt-6">
            <button className="btn-secondary" onClick={onBack}>Back</button>
            <button className="btn-primary" onClick={onNext}>Next</button>
        </div>
    </>
);
export default SignUpStep2;