import React from 'react';
import {useState, useEffect} from 'react';
import {useSound} from 'use-sound';
import play from '../assets/play.mp3';
import wrong from '../assets/wrong.mp3';
import correct from '../assets/correct.mp3';
//import wait from '../assets/wait.mp3';

export default function Trivia({data, questionNumber, setQuestionNumber, setStop}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName]=useState("answer");
  const [isStarted, setIsStarted] = useState(false);

  const [playSound]=useSound(play);
  const [correctAnswer]=useSound(correct);
  const [wrongAnswer]=useSound(wrong);
  
  //const [waitSound]=useSound(wait);

  useEffect(()=>{
    playSound();
  },[playSound,questionNumber]);

  const handleStart = () => {
    setIsStarted(true);
    playSound(); // Play sound after a user gesture
  };

  const delay=(duration,callback)=>{
    setTimeout(callback,duration);
};

const handleClick = (a) => {
  setSelectedAnswer(a);
  setClassName("answer active");
  delay(3000, () =>
    setClassName(a.correct ? "answer correct" : "answer wrong")
  );

  delay(5000, () => {
    if (a.correct) {
      correctAnswer();
      delay(1000, () => {
        setQuestionNumber((prev) => prev + 1);
        setSelectedAnswer(null);
      });
      
    } else {
      wrongAnswer();
      delay(1000, () => {
        
        setStop(true);
      });
      
    }
  });
};

useEffect(() => {
  setQuestion(data[questionNumber - 1]);
}, [questionNumber, data]);

useEffect(() => {
  if (isStarted) {
    setQuestion(data[questionNumber - 1]);
  }
}, [isStarted, questionNumber, data]);

if (!isStarted) {
  return <button onClick={handleStart}>Start Trivia</button>;
}

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a,index)=>(
          <div key={index} className={selectedAnswer===a? className:"answer"} onClick={()=>handleClick(a)}>{a.text}</div>
        ))}
        
      </div>
    </div>
  )
}
