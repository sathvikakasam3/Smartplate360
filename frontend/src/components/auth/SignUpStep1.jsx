// src/components/auth/SignUpStep1.jsx
const SignUpStep1 = ({ data, onChange, onNext }) => (
    <>
        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
        <div className="space-y-4">
            <input value={data.fullName} onChange={(e) => onChange({ fullName: e.target.value })} placeholder="Full Name" className="w-full input" />
            <input value={data.age} onChange={(e) => onChange({ age: e.target.value })} placeholder="Age" className="w-full input" />
            <input value={data.weight} onChange={(e) => onChange({ weight: e.target.value })} placeholder="Weight (kg)" className="w-full input" />
            <input value={data.height} onChange={(e) => onChange({ height: e.target.value })} placeholder="Height (cm)" className="w-full input" />
        </div>
        <button className="btn-primary mt-6 w-full" onClick={onNext}>Next</button>
    </>
);
export default SignUpStep1;