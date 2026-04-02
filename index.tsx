import React, { useState, useEffect } from 'react';

interface Meal {
  id: number;
  name: string;
  weight: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const App = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [foodName, setFoodName] = useState('');
  const [weight, setWeight] = useState('');
  const API_URL = "https:macro-food-app-9.onrender.com.";

  const fetchMeals = async () => {
    const res = await fetch(`${API_URL}/meals`);
    const data = await res.json();
    setMeals(data);
  };

  const addMeal = async () => {
    if (!foodName || !weight) return;
    await fetch(`${API_URL}/analyze?name=${foodName}&weight=${weight}`, { method: 'POST' });
    setFoodName(''); setWeight('');
    fetchMeals();
  };

  const deleteMeal = async (id: number) => {
    await fetch(`${API_URL}/meals/${id}`, { method: 'DELETE' });
    fetchMeals();
  };

  const totals = meals.reduce((acc, m) => ({
    cal: acc.cal + m.calories,
    pro: acc.pro + m.protein,
    carb: acc.carb + m.carbs,
    fat: acc.fat + m.fats
  }), { cal: 0, pro: 0, carb: 0, fat: 0 });

  useEffect(() => { fetchMeals(); }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-1">Food Macros</h1>
      <p className="text-gray-400 mb-8">Track your nutrition</p>

      {/* Input Card */}
      <div className="bg-[#1c1c1e] p-6 rounded-2xl mb-6 border border-gray-800">
        <h2 className="text-xl font-semibold mb-4">Analyze Food</h2>
        <input 
          className="w-full bg-[#2c2c2e] p-4 rounded-xl mb-3 outline-none" 
          placeholder="Food name (e.g., Chicken)" 
          value={foodName} onChange={e => setFoodName(e.target.value)}
        />
        <input 
          className="w-full bg-[#2c2c2e] p-4 rounded-xl mb-6 outline-none" 
          placeholder="Weight in grams" 
          type="number" value={weight} onChange={e => setWeight(e.target.value)}
        />
        <button 
          onClick={addMeal}
          className="w-full bg-[#4cd964] text-black font-bold py-4 rounded-xl hover:bg-green-400 transition"
        >
          🍎 Analyze with AI
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-[#1c1c1e] p-6 rounded-2xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-2">Today's Summary</h2>
        <p className="text-gray-500 mb-6 text-sm">2026-04-02</p>
        
        <div className="flex justify-between mb-8">
          <Stat label="Calories" val={totals.cal} color="border-red-500" />
          <Stat label="Protein" val={totals.pro} color="border-cyan-500" />
          <Stat label="Carbs" val={totals.carb} color="border-yellow-500" />
          <Stat label="Fats" val={totals.fat} color="border-teal-500" />
        </div>

        {/* List with Delete Button */}
        <div className="space-y-4">
          {meals.length === 0 ? <p className="text-center text-gray-500">No entries yet.</p> : 
            meals.map(m => (
              <div key={m.id} className="flex justify-between items-center bg-[#2c2c2e] p-4 rounded-lg">
                <div>
                  <p className="font-bold">{m.name} ({m.weight}g)</p>
                  <p className="text-xs text-gray-400">{m.calories} kcal | P: {m.protein}g</p>
                </div>
                <button onClick={() => deleteMeal(m.id)} className="text-red-500 text-sm font-semibold">DELETE</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, val, color }: any) => (
  <div className={`border-l-4 ${color} pl-3`}>
    <p className="text-xl font-bold">{val.toFixed(1)}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

export default App;
