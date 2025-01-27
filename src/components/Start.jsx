import "../app.css";
import { useRef, useState } from "react";

export default function Start({ setUsername }) {
    const inputRef = useRef();
    const [name, setName] = useState("");
    const [showWelcome, setShowWelcome] = useState(false);

    const handleInputSubmit = () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            const enteredName = inputRef.current.value.trim();
            setName(enteredName); 
            setShowWelcome(true); 
        }
    };

    const handleStartGame = () => {
        setUsername(name); 
        console.log("Game started with username:", name);
    };

    return (
        <div className="startPage">
            <h1>Who wants to be a Millionaire while learning Sanskrit?</h1>

            {!showWelcome ? (
                <div className="start">
                    <input
                        className="startInput"
                        placeholder="Enter your name"
                        ref={inputRef}
                    />
                    <button className="startButton" onClick={handleInputSubmit}>
                        Submit
                    </button>
                </div>
            ) : (
                <div className="welcome">
                    <h2>Welcome {name} to Gyan-Yatra! </h2>
                    <h2>How to play the game?</h2>
                    <ul>
                        <li><strong><i>Objective:</i></strong> Answer multiple-choice questions (MCQs) related to Sanskrit to earn virtual money and progress through the game.</li>
                        <li><strong><i>Number of Questions:</i></strong> There are 4 questions in total, each with increasing difficulty.</li>
                        <li><strong><i>Time Limit:</i></strong> You have 40 seconds to answer each question.</li>
                        <li><strong><i>Earning Money:</i></strong> Each question is associated with a specific monetary value. The amount of money earned increases as you progress to the next question.</li>
                        <li><strong><i>Answering Questions:</i></strong> For each question, 4 answer options will be displayed. Click on the option you think is correct.</li>
                        <li><strong><i>Game Progression:</i></strong> If you select the correct answer, you advance to the next question. If your answer is incorrect, the game ends, and your total winnings will be displayed.</li>
                        <li><strong><i>Winning the Game:</i></strong> Successfully answer questions correctly to win the maximum prize.</li>
                        <li><strong><i>Enjoy the Challenge:</i></strong> Test your knowledge of Sanskrit and see how far you can go!</li>
                    </ul>
                    <button className="startButton" onClick={handleStartGame}>
                        Start Game
                    </button>
                </div>
            )}
        </div>
    );
}
