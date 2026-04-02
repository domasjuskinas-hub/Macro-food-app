from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Meal(BaseModel):
    id: int
    name: str
    weight: float
    calories: float
    protein: float
    carbs: float
    fats: float

db = []
id_counter = 1

# API Endpoints
@app.get("/api/meals")
def get_meals():
    return db

@app.post("/api/analyze")
def analyze(name: str, weight: float):
    global id_counter
    factor = weight / 100
    new_meal = Meal(
        id=id_counter, name=name, weight=weight,
        calories=round(150 * factor, 1), protein=round(20 * factor, 1),
        carbs=round(5 * factor, 1), fats=round(5 * factor, 1)
    )
    db.append(new_meal)
    id_counter += 1
    return new_meal

@app.delete("/api/meals/{meal_id}")
def delete_meal(meal_id: int):
    global db
    db = [m for m in db if m.id != meal_id]
    return {"status": "ok"}

# Serve the Frontend
@app.get("/", response_class=HTMLResponse)
def serve_home():
    with open("app.tsx", "r") as f:
        ts_code = f.read()
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-black">
        <div id="root"></div>
        <script type="text/babel">
            {ts_code}
        </script>
    </body>
    </html>
    """
