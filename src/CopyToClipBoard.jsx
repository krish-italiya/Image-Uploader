import React, { useState } from 'react';

const CopyToClipBoard = ({ text, onChange }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = text; // Replace with the text you want to copy
        onChange(textToCopy)
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000); // Reset copied state after 2 seconds
        } catch (err) {
            console.error('Failed to copy:', err);
        }

        document.body.removeChild(textArea);
    };

    return (
        <div>
            <button onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy Image Link'}
            </button>
        </div>
    );
};

export default CopyToClipBoard;
