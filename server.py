from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allows your frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class FoodQuery(BaseModel):
    food_name: str
    weight: float

@app.post("/analyze")
async def analyze_food(query: FoodQuery):
    # In a real app, this is where you'd call an AI API
    # For now, here is a mock response based on your UI
    return {
        "calories": 150,
        "protein": 25.0,
        "carbs": 0.0,
        "fats": 5.0,
        "date": "2026-04-01"
    }
