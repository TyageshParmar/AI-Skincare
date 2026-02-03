from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import utils

app = FastAPI(title="Skincare Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only. In prod, specify the frontend URL.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendationResponse(BaseModel):
    brightness_score: float
    recommendation: str
    mock_collection_link: str

@app.post("/recommend", response_model=RecommendationResponse)
async def recommend(
    image: UploadFile = File(...),
    goal: str = Form(...),
    history: str = Form(...)
):
    # Read image bytes
    image_bytes = await image.read()
    
    # 1. Calculate brightness
    brightness = utils.calculate_brightness(image_bytes)
    
    # 2. Get AI recommendation
    recommendation_text = utils.get_skincare_recommendation(goal, history, brightness)
    
    # 3. Return response with mock link
    return {
        "brightness_score": brightness,
        "recommendation": recommendation_text,
        "mock_collection_link": "https://dermatics.com/collections/custom-routine-xyz"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
