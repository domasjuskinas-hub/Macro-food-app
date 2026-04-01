import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // USE YOUR RENDER URL HERE
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
      setItems([{ ...data, id: Date.now() }, ...items]);
      setInput('');
    } catch (e) {
      alert("Server is warming up... try again in 20 seconds.");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalCals = items.reduce((sum, i) => sum + (i.calories || 0), 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000', fontFamily: '-apple-system, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '8px' }}>DAILY LOG</h1>
        <div style={{ fontSize: '48px', fontWeight: '900', marginBottom: '30px', borderBottom: '5px solid black', paddingBottom: '10px' }}>
          {totalCals} <span style={{ fontSize: '20px', color: '#666' }}>KCAL</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's for lunch?"
            style={{ flex: 1, padding: '16px', border: '3px solid black', fontSize: '16px', fontWeight: 'bold', borderRadius: '0' }}
          />
          <button 
            onClick={addItem}
            style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '0 24px', fontWeight: '900', cursor: 'pointer' }}
          >
            {loading ? '...' : 'ADD'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <div key={item.id} style={{ border: '3px solid black', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '900', fontSize: '18px' }}>{item.food.toUpperCase()}</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#444' }}>P {item.protein}g · C {item.carbs}g · F {item.fat}g</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: '900' }}>{item.calories}</span>
                <button 
                  onClick={() => deleteItem(item.id)}
                  style={{ background: 'none', border: '2px solid #ff0000', color: '#ff0000', padding: '6px 10px', fontWeight: '900', cursor: 'pointer', fontSize: '12px' }}
                >
                  DEL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
