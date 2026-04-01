import React, { useState, useEffect } from 'react';

export default function MacroTracker() {
  const [input, setInput] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);

  // REPLACE THIS URL with your actual Render URL (keep the /track at the end)
  const API_URL = "https://macro-api.onrender.com/track";

  const handleTrack = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
      // Add the new food to the top of the list
      setFoodList([data, ...foodList]);
      setInput('');
    } catch (err) {
      alert("Server is waking up or connection failed. Try again in 30 seconds!");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = (index) => {
    const newList = [...foodList];
    newList.splice(index, 1);
    setFoodList(newList);
  };

  const clearAll = () => {
    if (window.confirm("Clear your whole list?")) {
      setFoodList([]);
    }
  };

  const totalCalories = foodList.reduce((sum, item) => sum + (item.calories || 0), 0);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#4CAF50' }}>Macro Tracker</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 2 eggs and toast"
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', fontSize: '16px' }}
        />
        <button 
          onClick={handleTrack}
          disabled={loading}
          style={{ padding: '12px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold' }}
        >
          {loading ? '...' : 'Add'}
        </button>
      </div>

      <div style={{ backgroundColor: '#1e1e1e', padding: '15px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>Total: {totalCalories} kcal</h3>
      </div>

      <div>
        {foodList.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.food || "Unknown Food"}</div>
              <div style={{ fontSize: '14px', color: '#aaa' }}>
                P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{item.calories}</span>
              <button 
                onClick={() => deleteItem(index)}
                style={{ backgroundColor: 'transparent', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '5px', padding: '5px 8px', cursor: 'pointer' }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {foodList.length > 0 && (
        <button 
          onClick={clearAll}
          style={{ width: '100%', marginTop: '20px', padding: '10px', backgroundColor: 'transparent', color: '#666', border: 'none', fontSize: '14px' }}
        >
          Clear All Data
        </button>
      )}
    </div>
  );
}
