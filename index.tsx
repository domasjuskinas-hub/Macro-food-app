import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // YOUR RENDER URL
  const API_URL = "https://macro-food-app-2.onrender.com/track";

  const addItem = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      // We add a unique ID so we know which one to delete
      setItems([{ ...data, id: Date.now() }, ...items]);
      setInput('');
    } catch (e) {
      alert("Render is waking up... try again in 20s");
    } finally {
      setLoading(false);
    }
  };

  // THIS IS THE DELETE LOGIC
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalCals = items.reduce((sum, i) => sum + (i.calories || 0), 0);

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ margin: '0 0 10px 0' }}>MACRO TRACKER</h2>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2ecc71', marginBottom: '20px' }}>
        {totalCals} <span style={{ fontSize: '16px', color: '#888' }}>KCAL TOTAL</span>
      </div>

      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 2 eggs and toast"
        style={{ width: '100%', padding: '15px', marginBottom: '10px', borderRadius: '8px', border: 'none', background: '#222', color: 'white', fontSize: '16px' }}
      />
      <button 
        onClick={addItem}
        style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}
      >
        {loading ? 'ANALYZING...' : 'ADD MEAL'}
      </button>

      <div style={{ marginTop: '30px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: '#1e1e1e', padding: '15px', borderRadius: '10px', marginBottom: '10px', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <b style={{ textTransform: 'uppercase' }}>{item.food}</b><br />
              <span style={{ color: '#888', fontSize: '14px' }}>{item.calories} cal | {item.protein}g P</span>
            </div>
            <button 
              onClick={() => deleteItem(item.id)}
              style={{ background: 'none', border: '1px solid #ff4444', color: '#ff4444', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}
            >
              REMOVE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
