import { useState } from 'react'
import './App.css'
import AnalysisForm from './components/AnalysisForm'
import ResultCard from './components/ResultCard'

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // NOTE: In production, use environment variable. For this assignment, we hardcode localhost.
  const API_URL = "http://localhost:8000/recommend";

  const handleAnalysis = async ({ goal, history, image }) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('goal', goal);
      formData.append('history', history);
      formData.append('image', image);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze skin. Please ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ marginBottom: '3rem' }}>
        <h1>AI Skincare Analysis</h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
          Upload your selfie to get personalized skincare recommendations powered by AI.
        </p>
      </div>

      {!result ? (
        <AnalysisForm onSubmit={handleAnalysis} isLoading={loading} />
      ) : (
        <ResultCard result={result} onReset={() => setResult(null)} />
      )}

      {loading && (
        <div className="loading-spinner"></div>
      )}
    </>
  )
}

export default App
