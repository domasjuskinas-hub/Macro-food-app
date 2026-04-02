from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI()

# Allow frontend access (important for Render)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory DB (replace with real DB later)
meals = []

class Meal(BaseModel):
    id: str
    name: str
    grams: float
    calories: float
    protein: float
    carbs: float
    fats: float

class MealInput(BaseModel):
    name: str
    grams: float

# Fake macro calculator (replace with real API later)
def calculate_macros(name: str, grams: float):
    return {
        "calories": grams * 1.5,
        "protein": grams * 0.1,
        "carbs": grams * 0.2,
        "fats": grams * 0.05,
    }

@app.get("/")
def root():
    return {"message": "Food Macros API running"}

@app.get("/meals")
def get_meals():
    return meals

@app.post("/meals")
def add_meal(meal_input: MealInput):
    macros = calculate_macros(meal_input.name, meal_input.grams)

    meal = {
        "id": str(uuid.uuid4()),
        "name": meal_input.name,
        "grams": meal_input.grams,
        **macros
    }

    meals.append(meal)
    return meal

@app.delete("/meals/{meal_id}")
def delete_meal(meal_id: str):
    global meals
    meals = [m for m in meals if m["id"] != meal_id]
    return {"message": "Meal deleted"}