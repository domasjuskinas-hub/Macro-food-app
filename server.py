from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# This allows your website to talk to your server
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
    # Your logic here
    return {
        "food": food.text, 
        "calories": 250, 
        "protein": 20, 
        "carbs": 15, 
        "fat": 8
    }
