from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class FoodInput(BaseModel):
    text: str

@app.get("/", response_class=HTMLResponse)
async def read_items():
    # This sends the "Screen" to your browser
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Macro Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { background: white; color: black; font-family: sans-serif; padding: 20px; }
            .card { border: 2px solid black; padding: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
            input { padding: 10px; border: 2px solid black; width: 60%; font-size: 16px; }
            button { padding: 10px; background: black; color: white; border: none; font-weight: bold; cursor: pointer; }
            .del-btn { background: white; color: red; border: 1px solid red; padding: 5px; }
        </style>
    </head>
    <body>
        <h1>MACRO LOG</h1>
        <div id="total" style="font-size: 32px; font-weight: 900;">0 KCAL</div>
        <br>
        <input type="text" id="foodInput" placeholder="e.g. 2 eggs">
        <button onclick="addFood()">ADD</button>
        <div id="list" style="margin-top: 20px;"></div>

        <script>
            let items = [];
            async def addFood() {
                const text = document.getElementById('foodInput').value;
                const res = await fetch('/track', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({text})
                });
                const data = await res.json();
                items.push({...data, id: Date.now()});
                render();
            }
            function deleteItem(id) {
                items = items.filter(i => i.id !== id);
                render();
            }
            function render() {
                const list = document.getElementById('list');
                const total = document.getElementById('total');
                list.innerHTML = items.map(i => `
                    <div class="card">
                        <div><b>${i.food}</b><br>P: ${i.protein}g</div>
                        <div><b>${i.calories}</b> <button class="del-btn" onclick="deleteItem(${i.id})">DELETE</button></div>
                    </div>
                `).join('');
                total.innerText = items.reduce((s, i) => s + i.calories, 0) + ' KCAL';
            }
        </script>
    </body>
    </html>
    """

@app.post("/track")
async def track(food: FoodInput):
    # Your AI logic goes here (Simplified for example)
    return {"food": food.text, "calories": 200, "protein": 20, "carbs": 10, "fat": 5}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
