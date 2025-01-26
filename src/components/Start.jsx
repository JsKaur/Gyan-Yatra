
import "../app.css";
import { useRef } from "react";
export default function Start({setUsername}) {

    const inputRef=useRef();
    const handleClick=()=>{
        inputRef.current.value && setUsername(inputRef.current.value);
    }
  return (
    <div>
        <h1>Who wants to be a Millionaire while learning Sanskrit?</h1>

        <div className="start">
            <input className="startInput" placeholder="Enter your name" ref={inputRef} />
            {/* <button className="startButton" onClick={handleClick}>Start</button> */}
        </div>

        <h2>Welcome {}</h2>

        <button className="startButton" onClick={handleClick}>Start</button>
    </div>
  )
}
