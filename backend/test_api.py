from fastapi.testclient import TestClient
from main import app
from PIL import Image
import io
import os

client = TestClient(app)

def create_dummy_image():
    # Create a small gray image
    img = Image.new('L', (100, 100), color=128)
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    return img_byte_arr.getvalue()

def test_recommend_endpoint():
    print("Testing /recommend endpoint...")
    
    image_bytes = create_dummy_image()
    
    files = {
        'image': ('test.png', image_bytes, 'image/png')
    }
    data = {
        'goal': 'hydration',
        'history': 'cleanser, moisturizer'
    }
    
    response = client.post("/recommend", files=files, data=data)
    
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        json_resp = response.json()
        print("Response JSON:")
        print(json_resp)
        
        # Basic assertions
        assert "brightness_score" in json_resp
        assert "recommendation" in json_resp
        assert "mock_collection_link" in json_resp
        print("✅ Test Passed!")
    else:
        print("❌ Test Failed!")
        print(response.text)

if __name__ == "__main__":
    # Check if API Key is present
    from dotenv import load_dotenv
    load_dotenv()
    if not os.environ.get("GROQ_API_KEY") or os.environ.get("GROQ_API_KEY") == "your_groq_api_key_here":
        print("⚠️ WARNING: GROQ_API_KEY might not be set correctly in .env. The API call might fail.")
    
    test_recommend_endpoint()
