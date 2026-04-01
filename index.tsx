import React, { useState } from 'react';

export default function MacroTracker() {
  const [input, setInput] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. CHANGE THIS URL to your actual Render URL!
  // Example: "https://your-app-name.onrender.com/track"
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
      // Adds new food to the top of the list
      setFoodList([data, ...foodList]);
      setInput('');
    } catch (err) {
      alert("Wake-up call: The server is starting. Please wait 30 seconds and try again!");
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
    if (window.confirm("Are you sure you want to clear the entire list?")) {
      setFoodList([]);
    }
  };

  const totalCalories = foodList.reduce((sum, item) => sum + (item.calories || 0), 0);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '25px' }}>Macro Tracker</h2>
      
      {/* Input Section */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 3 eggs or 100g steak"
          style={{ flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #333', fontSize: '16px', backgroundColor: '#1e1e1e', color: 'white' }}
        />
        <button 
          onClick={handleTrack}
          disabled={loading}
          style={{ padding: '14px 24px', borderRadius: '10px', border: 'none', backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', fontSize: '16px' }}
        >
          {loading ? '...' : 'Add'}
        </button>
      </div>

      {/* Summary Box */}
      <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '15px', marginBottom: '25px', textAlign: 'center', border: '1px solid #333' }}>
        <p style={{ margin: 0, color: '#888', fontSize: '14px', textTransform: 'uppercase' }}>Daily Total</p>
        <h1 style={{ margin: '5px 0 0 0', fontSize: '36px', color: '#4CAF50' }}>{totalCalories} <span style={{fontSize: '18px', color: '#888'}}>kcal</span></h1>
      </div>

      {/* Food List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {foodList.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#252525', padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '5px solid #4CAF50' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', fontSize: '17px', marginBottom: '4px' }}>{item.food || "Food Item"}</div>
              <div style={{ fontSize: '13px', color: '#888' }}>
                P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.calories}</div>
              <button 
                onClick={() => deleteItem(index)}
                style={{ backgroundColor: '#331111', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '8px', padding: '8px 12px', fontSize: '18px', cursor: 'pointer' }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Clear All Footer */}
      {foodList.length > 0 && (
        <button 
          onClick={clearAll}
          style={{ width: '100%', marginTop: '30px', padding: '12px', backgroundColor: 'transparent', color: '#ff4444', border: '1px solid #442222', borderRadius: '10px', fontSize: '14px', fontWeight: '500' }}
        >
          Clear All History
        </button>
      )}
    </div>
  );
}
