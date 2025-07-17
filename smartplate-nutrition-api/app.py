#smartplate-nutrition-api/app.py
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins (React frontend)

# Load and prepare the CSV
try:
    df = pd.read_csv("Indian_Food_Nutrition_Processed.csv")
    df.rename(columns={"Dish Name": "name"}, inplace=True)  # Rename for internal consistency
    df['name'] = df['name'].str.lower().str.strip()         # Clean names for searching
    print("✅ CSV loaded successfully with", len(df), "rows.")
except Exception as e:
    print("❌ Failed to load CSV:", e)
    df = pd.DataFrame()  # fallback empty

# API route to handle /api/nutrition?query=dosa
@app.route("/api/nutrition", methods=["GET"])
def get_nutrition():
    query = request.args.get("query", "").lower().strip()
    if not query:
        return jsonify({"error": "Query parameter is missing"}), 400

    matched = df[df['name'].str.contains(query)]
    if matched.empty:
        return jsonify({"error": "Dish not found"}), 404

    return jsonify(matched.to_dict(orient="records")), 200

if __name__ == "__main__":
    app.run(debug=True, port=5002)