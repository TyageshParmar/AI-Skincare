# AI Skincare Recommendation App

A full-stack AI-powered application that analyzes skin health from a selfie and provides personalized skincare routine recommendations using Groq LLM.

<p align="center">
  <img src="frontend/public/logo.png" alt="AI Skincare Logo" width="100" />
</p>

## 🌟 Features

- **AI Skin Analysis**: Calculates skin brightness score using image processing.
- **Personalized Recommendations**: Uses Groq LLM (Llama 3) to generate a tailored skincare routine based on user goals (e.g., "Anti-aging", "Acne") and product history.
- **Dual Capture Modes**: Upload an existing photo or take a live selfie using the built-in camera.
- **Premium UI**: Modern, glassmorphism-inspired dark interface with responsive design.
- **One-Click Startup**: Automated batch script to launch both backend and frontend instantly.

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **AI/LLM**: Groq API (Llama-3.1-8b-instant)
- **Image Processing**: Pillow (PIL)
- **Dependencies**: `fastapi`, `uvicorn`, `python-multipart`, `groq`

### Frontend
- **Framework**: React + Vite
- **Styling**: Pure CSS (Custom Glassmorphism Theme)
- **Camera**: `react-webcam`
- **Markdown**: `react-markdown` for rich text display

## 📋 Prerequisites

Before running the project, ensure you have:
1.  **Python 3.8+** installed.
2.  **Node.js 16+** & **npm** installed.
3.  A **Groq API Key** (Get one at [console.groq.com](https://console.groq.com)).

## 🚀 Installation

### 1. Backend Setup

Navigate to the `backend` folder and set up the Python environment:

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
```

**Configure API Key**:
1. Open `backend/.env`.
2. Replace the placeholder with your actual key:
   ```env
   GROQ_API_KEY=your_actual_groq_api_key
   ```

### 2. Frontend Setup

Navigate to the `frontend` folder and install dependencies:

```bash
cd frontend
npm install
```

## 🏃‍♂️ How to Run

### Option 1: One-Click Start (Recommended)
Simply double-click the **`start_app.bat`** file in the root directory.
This will:
1.  Start the FastAPI backend server on port `8000`.
2.  Start the React frontend development server.
3.  The app should open or be available at `http://localhost:5173`.

### Option 2: Manual Start

**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## 📂 Project Structure

```
Darmatics Assignment/
├── start_app.bat          # Automation script
├── backend/               # FastAPI Backend
│   ├── main.py            # API Routes & Configuration
│   ├── utils.py           # Helper functions (Brightness, AI)
│   ├── requirements.txt   # Python dependencies
│   ├── .env               # Secrets (API Key)
│   └── test_api.py        # Verification script
└── frontend/              # React Frontend
    ├── public/            # Static assets (logo)
    ├── src/
    │   ├── components/
    │   │   ├── AnalysisForm.jsx  # Input & Camera logic
    │   │   └── ResultCard.jsx    # Results display
    │   ├── App.jsx        # Main application layout
    │   └── index.css      # Global styles
    └── package.json       # Node dependencies
```

## 🔌 API Documentation

The backend provides interactive documentation via **Swagger UI**.
- URL: `http://localhost:8000/docs`

### `POST /recommend`

**Request (Multipart Form Data):**
- `image`: The face image file.
- `goal`: User's skincare goal (string).
- `history`: Previous products used (string).

**Response (JSON):**
```json
{
  "brightness_score": 145.2,
  "recommendation": "**Routine:** ...",
  "mock_collection_link": "..."
}
```

## 🤝 Troubleshooting

- **Camera not working?**: Ensure your browser has permission to access the camera.
- **Dependency import error?**: Run `npm install` inside the frontend folder again.
- **API Error?**: Check if your Groq API Key is correct in `backend/.env`.
