import { useEffect, useState, useMemo } from "react";
import Confetti from "react-confetti";
import Trivia from "./components/Trivia";
import data from "./data.json";
import Timer from "./components/Timer";
import Start from "./components/Start";
import "./app.css";
import { useWindowSize } from "react-use";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [username, setUsername] = useState(null);
  const [earned, setEarned] = useState("$0");
  const [stop, setStop] = useState(false);
  const [timeModifier, setTimeModifier] = useState(40);
  const { width, height } = useWindowSize(); // Get screen size for confetti
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Function to shuffle array (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setShuffledQuestions(shuffleArray(data)); // Shuffle questions at the start
  }, []);

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$100" },
        { id: 2, amount: "$200" },
        { id: 3, amount: "$300" },
        { id: 4, amount: "$500" },
        { id: 5, amount: "$1000" },
        { id: 6, amount: "$2000" },
        { id: 7, amount: "$4000" },
        { id: 8, amount: "$8000" },
        { id: 9, amount: "$16000" },
        { id: 10, amount: "$32000" },
        { id: 11, amount: "$64000" },
        { id: 12, amount: "$125000" },
        { id: 13, amount: "$250000" },
        { id: 14, amount: "$500000" },
        { id: 15, amount: "$1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    if (questionNumber > 1) {
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
    }
  }, [moneyPyramid, questionNumber]);

  useEffect(() => {
    setTimeModifier(40);
  }, [questionNumber]);

  const handleEnd = () => {
    setStop(false);
    setQuestionNumber(1);
    setEarned("$0");

    setTimeout(() => {
      setTimeModifier(40);
      setShuffledQuestions(shuffleArray(data)); // Reshuffle questions when restarting
    }, 10);
  };

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
          {stop ? (
  <div className="end">
   
    {earned !== "$0" && <Confetti width={width} height={height} numberOfPieces={500} />}
    <h1 className="endText">You earned: {earned} </h1>
    <button className="endButton" onClick={handleEnd}>
      Play Again
    </button>
  </div>
) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setStop={setStop}
                      questionNumber={questionNumber}
                      timeModifier={timeModifier}
                      setTimeModifier={setTimeModifier}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={shuffledQuestions} // Use shuffled questions
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                    setTimeModifier={setTimeModifier}
                  />
                </div>
              </>
            )}
          </div>

          <div className="pyramid">
            {!stop && (
              <ul className="moneyList">
                {moneyPyramid.map((m) => (
                  <li
                    className={
                      questionNumber === m.id
                        ? "moneyListItem active"
                        : "moneyListItem"
                    }
                    key={m.id}
                  >
                    <span className="listNumber">{m.id}</span>
                    <span className="money">{m.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
