import React, { useState, useEffect } from 'react'

const DynamicGif = () => {
    const [gifSrc, setGifSrc] = useState('')
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const averageGifDuration = 5000; // Approximate duration for the GIF in milliseconds
  

    const fetchRandomGif = async () => {
        setLoading(true);
        setProgress(0);
        const apiKey = 't7djEdZ4tdsqTDL8W1jEEIMMWncQYCgR'
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

        try {
            const response = await fetch(url)
            const data = await response.json()
            setGifSrc(data.data.images.original.url);
            startProgress();
        } catch (error) {
            console.error('Error fetching the GIF:', error);
        } finally {
            setLoading(false);
        }
    }

    const startProgress = () => {
        const interval = 100;
        let elapsed = 0;

        const progressInterval = setInterval(() => {
            elapsed += interval;
            setProgress((elapsed / averageGifDuration) * 100);

            if(elapsed >= averageGifDuration) {
                clearInterval(progressInterval)
            }
        }, interval)

    }

    
  useEffect(() => {
    if (gifSrc) {
      startProgress();
    }
  }, [gifSrc]);



    return (
        <div>
          <button onClick={fetchRandomGif} disabled={loading}>
            {loading ? 'Loading...' : 'Get Random GIF'}
          </button>
          {gifSrc && (
        <div>
          <img src={gifSrc} alt="Random GIF" style={{ width: '25rem', marginTop: '10px' }}/>
          <div style={{ border: '1px solid #000', width: '100%', marginTop: '10px' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '10px',
                backgroundColor: 'green',
                transition: 'width 0.1s linear',
              }}
            ></div>
          </div>
        </div>
      )}
        </div>
      );

}
export default DynamicGif;