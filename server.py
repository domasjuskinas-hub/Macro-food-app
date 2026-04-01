from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class FoodInput(BaseModel):
    text: str

@app.post("/track")
async def track(food: FoodInput):
    # This sends back the food data to your index.tsx
    return {
        "food": food.text,
        "calories": 250,
        "protein": 25,
        "carbs": 10,
        "fat": 5
    }

