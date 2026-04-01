from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class FoodInput(BaseModel):
    text: str

@app.get("/", response_class=HTMLResponse)
async def home():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Macro Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { background-color: #121212; color: white; font-family: sans-serif; padding: 20px; }
            .card { background: #1e1e1e; padding: 15px; border-radius: 10px; margin-bottom: 10px; border: 1px solid #333; display: flex; justify-content: space-between; align-items: center; }
            input { width: 100%; padding: 12px; margin-bottom: 10px; border-radius: 8px; border: none; box-sizing: border-box; background: #222; color: white; }
            button.add-btn { width: 100%; background: #2ecc71; color: white; padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
            .remove-btn { background: none; border: 1px solid #ff4444; color: #ff4444; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px; }
            .stats { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 18px; color: #2ecc71; font-weight: bold; }
        </style>
    </head>
    <body>
        <h2>MACRO TRACKER</h2>
        <div class="stats">
            <div id="cals">0 KCAL</div>
            <div id="prot">0g P</div>
        </div>
        <input type="text" id="foodInput" placeholder="e.g. 200g Chicken breast">
        <button class="add-btn" onclick="addFood()">ADD MEAL</button>
        <br><br>
        <div id="log"></div>

        <script>
            let items = [];
            async function addFood() {
                const input = document.getElementById('foodInput');
                const res = await fetch('/track', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({text: input.value})
                });
                const data = await res.json();
                items.push({...data, id: Date.now()});
                input.value = '';
                render();
            }
            function removeMeal(id) {
                items = items.filter(i => i.id !== id);
                render();
            }
            function render() {
                const log = document.getElementById('log');
                log.innerHTML = items.map(i => `
                    <div class="card">
                        <div><b>${i.food.toUpperCase()}</b><br>${i.calories} cal | ${i.protein}g P</div>
                        <button class="remove-btn" onclick="removeMeal(${i.id})">REMOVE</button>
                    </div>
                `).join('');
                document.getElementById('cals').innerText = items.reduce((s, i) => s + i.calories, 0) + ' KCAL';
                document.getElementById('prot').innerText = items.reduce((s, i) => s + i.protein, 0) + 'g P';
            }
        </script>
    </body>
    </html>
    """

@app.post("/track")
async def track(food: FoodInput):
    # This is your AI logic (simplified)
    return {"food": food.text, "calories": 250, "protein": 25}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
