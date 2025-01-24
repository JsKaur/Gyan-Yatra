import "./app.css";
import {useEffect, useState, useMemo} from "react";
import Trivia from "./components/Trivia";
import data from "./data.json";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned]=useState("$0");
  // const [timeOut, setTimeOut]=useState(false);
  const [stop, setStop]=useState(false);

const moneyPyramid= useMemo(()=> 
  [{id:1, amount:"$100"},
    {id:2, amount:"$200"},
    {id:3, amount:"$300"},
    {id:4, amount:"$500"},
    {id:5, amount:"$1000"},
    {id:6, amount:"$2000"},
    {id:7, amount:"$4000"},
    {id:8, amount:"$8000"},
    {id:9, amount:"$16000"},
    {id:10, amount:"$32000"},
    {id:11, amount:"$64000"},
    {id:12, amount:"$125000"},
    {id:13, amount:"$250000"},
    {id:14, amount:"$500000"},
    {id:15, amount:"$1000000"}
  ].reverse(), 
  []
);
  

  useEffect(()=>{
    if(questionNumber>1){
      setEarned(moneyPyramid.find((m)=>m.id===questionNumber-1).amount);
    }
  },[moneyPyramid, questionNumber]);


  return (
    <>
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endText">You earned: {earned} </h1>) : ( 
          <>
        <div className="top">
          <div className="timer">30</div>
        </div>
        <div className="bottom">
          <Trivia 
            data={data}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            setStop={setStop}
          />
        </div>
        </>
        )}
      </div>
       
      
      
      <div className="pyramid">
        <ul className="moneyList">
        {moneyPyramid.map((m)=>(
          //In React, when rendering a list of items, it's important to use a unique key prop for each list item to ensure efficient updates
        <li className={questionNumber === m.id ? "moneyListItem active":"moneyListItem"} key={m.id}>
          <span className="listNumber">{m.id}</span>
          <span className="money">{m.amount}</span>
        </li>
        ))}
        
        </ul>
      </div>
    </div>
    </>
  );
}

export default App;
