import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

function AnalysisForm({ onSubmit, isLoading }) {
    const [goal, setGoal] = useState('');
    const [history, setHistory] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showCamera, setShowCamera] = useState(false);

    const webcamRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setShowCamera(false);
        }
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            // Convert base64 to blob
            fetch(imageSrc)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
                    setImage(file);
                    setPreview(imageSrc);
                    setShowCamera(false);
                });
        }
    }, [webcamRef]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image || !goal || !history) {
            alert("Please fill in all fields and provide an image.");
            return;
        }
        onSubmit({ goal, history, image });
    };

    return (
        <form onSubmit={handleSubmit} className="flex-col" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="card">
                <h2 style={{ marginTop: 0 }}>Your Profile</h2>

                <div style={{ textAlign: 'left' }}>
                    <label className="label">Skincare Goal</label>
                    <input
                        type="text"
                        placeholder="e.g., Brightening, Acne control, Anti-aging"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    />
                </div>

                <div style={{ textAlign: 'left' }}>
                    <label className="label">Product History</label>
                    <textarea
                        rows="3"
                        placeholder="e.g., Vitamin C, Niacinamide, Retinol..."
                        value={history}
                        onChange={(e) => setHistory(e.target.value)}
                    />
                </div>

                <div style={{ textAlign: 'left', marginTop: '1rem' }}>
                    <label className="label">Face Image</label>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => setShowCamera(false)}
                            style={{ flex: 1, background: !showCamera ? 'rgba(99, 102, 241, 0.2)' : 'transparent', border: '1px solid var(--glass-border)' }}
                        >
                            Upload
                        </button>
                        <button
                            type="button"
                            onClick={() => { setShowCamera(true); setPreview(null); setImage(null); }}
                            style={{ flex: 1, background: showCamera ? 'rgba(99, 102, 241, 0.2)' : 'transparent', border: '1px solid var(--glass-border)' }}
                        >
                            Camera
                        </button>
                    </div>

                    {showCamera ? (
                        <div className="file-upload" style={{ padding: '0', overflow: 'hidden' }}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width="100%"
                                videoConstraints={{ facingMode: "user" }}
                            />
                            <button type="button" onClick={capture} style={{ marginBottom: '1rem', width: 'auto' }}>
                                Capture Photo
                            </button>
                        </div>
                    ) : (
                        <div
                            className="file-upload"
                            onClick={() => document.getElementById('fileInput').click()}
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" style={{ maxHeight: '200px', borderRadius: '8px', maxWidth: '100%' }} />
                            ) : (
                                <div>
                                    <span style={{ fontSize: '2rem' }}>📷</span>
                                    <p>Click to upload your selfie</p>
                                </div>
                            )}
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    )}
                </div>

                <button type="submit" disabled={isLoading} style={{ width: '100%' }}>
                    {isLoading ? 'Analyzing Skin...' : 'Get Recommendation'}
                </button>
            </div>
        </form>
    );
}

export default AnalysisForm;
