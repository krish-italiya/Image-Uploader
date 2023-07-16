import React, { useEffect, useState } from 'react'
import "./App.css"
import Loader from './Loader'
import CopyToClipBoard from './CopyToClipBoard'

const CopyImage = ({ photos }) => {
    const [state, setState] = useState(false)
    const [copiedText, setCopiedText] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setState(true);
        }, 3000); // Delay of 2 seconds
        return () => clearTimeout(timer); // Clear the timer if component unmounts
    }, []);

    const generateLink = (link) => {
        return `https://image-uploader.onrender.com/uploads/${link}`
    }

    return (
        <>
            {!state && (
                <Loader />
            )}
            {state && (
                <div className='main'>
                    <div className='main-container'>
                        {photos && photos.map(photo => (
                            <div className='card-container'>
                                <img className='card' src={generateLink(photo)} alt="" />
                                <>
                                    {<CopyToClipBoard text={generateLink(photo)} onChange={setCopiedText} />}
                                </>
                            </div>
                        )
                        )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h2>Text You Copied:</h2>
                        {copiedText !== "" && (
                            <h4>{copiedText}</h4>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default CopyImage