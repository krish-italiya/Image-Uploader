import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prevProgress => (prevProgress + 10) % 100);
        }, 500); // Update progress every 500ms

        return () => clearInterval(timer); // Clear the timer if component unmounts
    }, []);

    return (
        <div className="loader-container">
            <div className="loader-text">Loading...</div>
            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Loader;
