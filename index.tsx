import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://macro-food-app-1.onrender.com/track";

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
      setItems([{ ...data, id: Date.now() }, ...items]);
      setInput('');
    } catch (e) {
      alert("Server waking up... wait 30 seconds and try again!");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalCals = items.reduce((sum, i) => sum + (i.calories || 0), 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', color: 'black', fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', textTransform: 'uppercase' }}>Macro Log</h1>
        <p style={{ margin: 0, fontSize: '40px', fontWeight: '900' }}>{totalCals} <span style={{fontSize: '16px'}}>KCAL</span></p>
      </header>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What did you eat?"
          style={{ flex: 1, padding: '15px', border: '2px solid black', fontSize: '16px', fontWeight: 'bold' }}
        />
        <button 
          onClick={addItem}
          style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '0 20px', fontWeight: 'bold', fontSize: '16px' }}
        >
          {loading ? '...' : 'ADD'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ border: '2px solid black', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '900', fontSize: '18px', textTransform: 'uppercase' }}>{item.food || 'Food'}</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ fontSize: '20px', fontWeight: '900' }}>{item.calories}</div>
              <button 
                onClick={() => deleteItem(item.id)}
                style={{ backgroundColor: 'white', border: '2px solid black', padding: '8px 12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button 
          onClick={() => setItems([])}
          style={{ marginTop: '40px', width: '100%', background: 'none', border: 'none', textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer' }}
        >
          CLEAR ALL
        </button>
      )}
    </div>
  );
}
