import React from 'react';
import {useState, useEffect} from 'react';

export default function Trivia({data, questionNumber, setQuestionNumber, setTimeOut}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName]=useState("answer");

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
  }

  useEffect(() => {

    setQuestion(data[questionNumber - 1]);
  },[questionNumber, data]);


  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a)=>(
          <div className={selectedAnswer===a? className:"answer"} onClick={()=>handleClick(a)}>{a.text}</div>
        ))}
        
      </div>
    </div>
  )
}
