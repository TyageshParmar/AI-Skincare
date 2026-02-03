@echo off
echo ==================================================
echo       Starting AI Skincare Application
echo ==================================================

echo 1. Starting Backend Server (Port 8000)...
start "AI Skincare Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload --port 8000"

echo 2. Starting Frontend (Port 5173)...
cd frontend
npm run dev
