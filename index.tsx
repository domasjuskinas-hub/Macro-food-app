const { useState, useEffect } = React;

const App = () => {
  const [meals, setMeals] = useState([]);
  const [food, setFood] = useState('');
  const [weight, setWeight] = useState('');

  const refresh = () => fetch('/api/meals').then(res => res.json()).then(setMeals);
  
  useEffect(() => { refresh(); }, []);

  const add = async () => {
    await fetch(`/api/analyze?name=${food}&weight=${weight}`, { method: 'POST' });
    setFood(''); setWeight('');
    refresh();
  };

  const remove = async (id) => {
    await fetch(`/api/meals/${id}`, { method: 'DELETE' });
    refresh();
  };

  const totals = meals.reduce((a, b) => ({
    c: a.c + b.calories, p: a.p + b.protein, cb: a.cb + b.carbs, f: a.f + b.fats
  }), { c: 0, p: 0, cb: 0, f: 0 });

  return (
    <div className="p-6 text-white max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Food Macros</h1>
      <div className="bg-zinc-900 p-4 rounded-xl my-4 border border-zinc-800">
        <input className="w-full bg-zinc-800 p-3 rounded mb-2" placeholder="Food" value={food} onChange={e => setFood(e.target.value)} />
        <input className="w-full bg-zinc-800 p-3 rounded mb-4" placeholder="Grams" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
        <button onClick={add} className="w-full bg-green-500 text-black font-bold py-3 rounded-lg">Analyze with AI</button>
      </div>
      
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <div className="flex justify-between text-center mb-4">
            <div><p>{totals.c.toFixed(0)}</p><p className="text-xs text-gray-500">Cal</p></div>
            <div><p>{totals.p.toFixed(1)}g</p><p className="text-xs text-gray-500">Pro</p></div>
            <div><p>{totals.cb.toFixed(1)}g</p><p className="text-xs text-gray-500">Carb</p></div>
        </div>
        {meals.map(m => (
          <div key={m.id} className="flex justify-between border-t border-zinc-800 py-2">
            <span>{m.name} ({m.calories} kcal)</span>
            <button onClick={() => remove(m.id)} className="text-red-500 text-xs">DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
