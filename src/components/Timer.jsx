import { useState, useEffect } from "react";

export default function Timer({ setStop, questionNumber, timeModifier }) {
    const [timer, setTimer] = useState(40); 


  useEffect(() => {
    if (timer === 0) return setStop(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(timeModifier); 
  }, [questionNumber, timeModifier]);

  return timer;
}
