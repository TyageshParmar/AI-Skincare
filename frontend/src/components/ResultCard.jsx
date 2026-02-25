import React from 'react';
import ReactMarkdown from 'react-markdown';

function ResultCard({ result, onReset }) {
    if (!result) return null;

    const { brightness_score, recommendation, mock_collection_link } = result;

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'left', animation: 'fadeIn 0.5s' }}>
            <h2 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>AI Analysis Results</h2>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                    <h3>Skin Brightness Score</h3>
                    <div className="brightness-bar-container">
                        <div
                            className="brightness-bar-fill"
                            style={{ width: `${(brightness_score / 255) * 100}%` }}
                        ></div>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{Math.round(brightness_score)}<span style={{ fontSize: '1rem', color: '#94a3b8' }}>/255</span></p>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                        {brightness_score > 180 ? 'Excellent Radiance' : brightness_score > 120 ? 'Moderate Radiance' : 'Needs Brightening'}
                    </p>
                </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                <h3>Dermatologist Recommendation</h3>
                <div className="markdown-content" style={{ lineHeight: '1.6', color: '#e2e8f0' }}>
                    <ReactMarkdown>{recommendation}</ReactMarkdown>
                </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <a
                    href={mock_collection_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <button style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        🛍️ Shop Your Custom Routine
                    </button>
                </a>
                <br />
                <button
                    onClick={onReset}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', marginTop: '1rem' }}
                >
                    Analyze Another
                </button>
            </div>
        </div>
    );
}

export default ResultCard;
