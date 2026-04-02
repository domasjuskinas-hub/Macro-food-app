from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Meal(BaseModel):
    id: int
    name: str
    weight: float
    calories: float
    protein: float
    carbs: float
    fats: float

# Database simulation
db = []
id_counter = 1

@app.get("/meals", response_model=List[Meal])
def get_meals():
    return db

@app.post("/analyze")
def analyze_food(name: str, weight: float):
    global id_counter
    # Simple multiplier logic (In a real app, you'd call an AI API here)
    # Mock data per 100g: 150 cal, 20g protein, 5g carbs, 5g fat
    factor = weight / 100
    new_meal = Meal(
        id=id_counter,
        name=name,
        weight=weight,
        calories=round(150 * factor, 1),
        protein=round(20 * factor, 1),
        carbs=round(5 * factor, 1),
        fats=round(5 * factor, 1)
    )
    db.append(new_meal)
    id_counter += 1
    return new_meal

@app.delete("/meals/{meal_id}")
def delete_meal(meal_id: int):
    global db
    db = [m for m in db if m.id != meal_id]
    return {"message": "Deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
