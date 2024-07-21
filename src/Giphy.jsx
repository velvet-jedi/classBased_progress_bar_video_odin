import React, { useState } from 'react'

const DynamicGif = () => {
    const [gifSrc, setGifSrc] = useState('')

    const fetchRandomGif = async () => {
        const apiKey = 't7djEdZ4tdsqTDL8W1jEEIMMWncQYCgR'
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

        try {
            const response = await fetch(url)
            const data = await response.json()
            setGifSrc(data.data.images.original.url);
        } catch (error) {
            console.error('Error fetching the GIF:', error);
        }
    }

    return (
        <div>
          <button onClick={fetchRandomGif}>Get Random GIF</button>
          {gifSrc && <img src={gifSrc} alt="Random GIF" />}
        </div>
      );

}
export default DynamicGif;