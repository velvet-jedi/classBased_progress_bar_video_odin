import { useState, useRef } from 'react'
import DynamicGif from './Giphy'
import './App.css'

function App() {
  const [todos, setTodos] = useState(["Todo sample"])
  const [inputValue, setInputValue] = useState("")

  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);
  };

  const handleVideoEnd = () => {
    setProgress(100);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputValue]);
    setInputValue("");
  };


  return (
    <>

    <div>
      <h4>Dynamic GIF Example</h4>
      <DynamicGif />
    </div>

      <video
        ref={videoRef}
        width="600"
        controls
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd} 
      />
      <input 
        type="range"
        min='0'
        max='100'
        value={progress} 
        ref={progressBarRef}
      />

      <section >
        <h3>{name}</h3>
        <form className='container' onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li>{todo}</li>
          ))}
        </ul>
      </section>
      
    </>
  )
}

export default App
