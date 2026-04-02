import { useEffect, useState } from "react";

type Meal = {
  id: string;
  name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
};

const API = "https://your-render-backend-url.onrender.com";

export default function App() {
  const [name, setName] = useState("");
  const [grams, setGrams] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMeals = async () => {
    const res = await fetch(`${API}/meals`);
    const data = await res.json();
    setMeals(data);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const addMeal = async () => {
    if (!name || !grams) return;

    await fetch(`${API}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        grams: Number(grams),
      }),
    });

    setName("");
    setGrams("");
    fetchMeals();
  };

  const deleteMeal = async (id: string) => {
    await fetch(`${API}/meals/${id}`, {
      method: "DELETE",
    });
    fetchMeals();
  };

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fats: acc.fats + m.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <div style={{ padding: 20, background: "#000", color: "#fff", minHeight: "100vh" }}>
      <h1>Food Macros</h1>
      <p>Track your nutrition</p>

      {/* Input */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Grams"
          type="number"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
        />
        <button onClick={addMeal}>Analyze with AI</button>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: 20 }}>
        <h2>Today's Summary</h2>
        <p>Calories: {totals.calories.toFixed(0)}</p>
        <p>Protein: {totals.protein.toFixed(1)}g</p>
        <p>Carbs: {totals.carbs.toFixed(1)}g</p>
        <p>Fats: {totals.fats.toFixed(1)}g</p>
      </div>

      {/* Meal List */}
      <div>
        <h2>Meals</h2>
        {meals.length === 0 && <p>No meals yet</p>}

        {meals.map((meal) => (
          <div
            key={meal.id}
            style={{
              border: "1px solid #333",
              padding: 10,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <h3>{meal.name}</h3>
            <p>{meal.grams}g</p>
            <p>Calories: {meal.calories}</p>
            <p>Protein: {meal.protein}g</p>
            <p>Carbs: {meal.carbs}g</p>
            <p>Fats: {meal.fats}g</p>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteMeal(meal.id)}
              style={{
                background: "red",
                color: "white",
                padding: "5px 10px",
                borderRadius: 5,
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}