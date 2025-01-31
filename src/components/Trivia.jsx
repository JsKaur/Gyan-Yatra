import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

import fifty from "../assets/50.png";
import times from "../assets/times2.jpg";


export default function Trivia({
  data,
  questionNumber,
  setQuestionNumber,
  setStop,
  setTimeModifier, // <-- Pass time modifier function from Timer
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [lifelineUsed, setLifelineUsed] = useState({ fifty: false, times: false });
  const [hiddenAnswers, setHiddenAnswers] = useState([]); // To track hidden answers

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    setHiddenAnswers([]); // Reset hidden answers when question changes
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    if (selectedAnswer) return;
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(2000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });

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

  const handleFifty = () => {
    if (lifelineUsed.fifty) return;
    setLifelineUsed((prev) => ({ ...prev, fifty: true }));

    const incorrectAnswers = question.answers.filter((a) => !a.correct);
    const answersToHide = incorrectAnswers.slice(0, 2); // Hide two incorrect answers
    setHiddenAnswers(answersToHide);
  };

  // const handleTimes = () => {
  //   if (lifelineUsed.times) return;
  //   setLifelineUsed((prev) => ({ ...prev, times: true }));
  //   setTimeModifier(80); // This should be updating the correct state
  //   // Update timer to 80 seconds
  // };

  const handleTimes = () => {
    setTimeModifier((prev) => prev * 2); // Correct function usage
  };
  

  

  return (
    <div className="trivia">
      <div className="lifelines">
        <img src={fifty} onClick={handleFifty} alt="50-50" className={`lifeline ${lifelineUsed.fifty ? "used" : ""}`} />
        <img src={times} onClick={handleTimes} alt="Double Time" className={`lifeline ${lifelineUsed.times ? "used" : ""}`} />
        
      </div>
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a, index) => (
          <div
            key={index}
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
            style={{ visibility: hiddenAnswers.includes(a) ? "hidden" : "visible" }} // Hide answers
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
