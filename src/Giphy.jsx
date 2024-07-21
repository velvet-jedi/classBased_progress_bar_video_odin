import React, { useState, useEffect } from 'react'

const DynamicGif = () => {
    const [gifSrc, setGifSrc] = useState('')
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
  

    const fetchRandomGif = async () => {
        setProgress(0);
        const apiKey = 't7djEdZ4tdsqTDL8W1jEEIMMWncQYCgR'
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

        try {
            const response = await fetch(url)
            const data = await response.json()
            const gifUrl = data.data.images.original.url;
            const gifDuration = data.data.image_mp4_url ? parseFloat(data.data.image_mp4_url.split('.mp4')[0].split('_').pop()) / 1000 : 10; // Assuming 10 seconds if duration is unavailable            console.log(data); // Assuming duration is in milliseconds
            setGifSrc(gifUrl);
            setDuration(gifDuration);
        } catch (error) {
            console.error('Error fetching the GIF:', error);
        }
    }

    const startProgress = (gifDuration) => {
        setProgress(0);
        const interval = 100;
        let elapsed = 0;

        const progressInterval = setInterval(() => {
            elapsed += interval;
            setProgress((elapsed / gifDuration) * 10);

            if(elapsed >= gifDuration * 100) {
                clearInterval(progressInterval)
                setProgress(0); // Reset progress back to 0 after it ends
            }
        }, interval)

    }

    
  useEffect(() => {
    if (gifSrc && duration) {
      startProgress(duration);
    }
  }, [gifSrc, duration]);



    return (
        <div>
          <button onClick={fetchRandomGif}>
          Get Random GIF
          </button>
          {gifSrc && (
        <div>
          <img src={gifSrc} alt="Random GIF" style={{ width: '25rem', marginTop: '10px' }}/>
          <div style={{ border: '1px solid #000', width: '100%', marginTop: '10px' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '10px',
                maxWidth: '100%',
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