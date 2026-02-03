import io
import os
from PIL import Image
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# Initialize Groq client
# Ensure GROQ_API_KEY is set in .env
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

def calculate_brightness(image_bytes: bytes) -> float:
    """
    Calculates the average brightness of an image.
    :param image_bytes: Bytes data of the image.
    :return: Average brightness (0-255).
    """
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert('L')  # Convert to grayscale
        start_brightness = sum(image.getdata()) / (image.width * image.height)
        return round(start_brightness, 2)
    except Exception as e:
        print(f"Error calculating brightness: {e}")
        return 0.0

def get_skincare_recommendation(goal: str, history: str, brightness: float) -> str:
    """
    Get skincare recommendation from Groq based on goal, history, and brightness.
    """
    
    prompt = f"""
    You are a professional dermatologist and skincare expert.
    
    User Profile:
    - Skincare Goal: {goal}
    - Product History: {history}
    - Skin Analysis (Brightness Score): {brightness}/255
    
    Based on this information, please provide:
    1. A brief analysis of their skin needs.
    2. A specific recommended skincare routine/solution.
    3. An explanation of why these ingredients/products were chosen.
    
    Keep the response concise, friendly, and structured.
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.1-8b-instant", # Using a supported model available on Groq
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error getting recommendation: {str(e)}"
