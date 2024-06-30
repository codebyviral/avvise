import "./OMRSheet.css";
import { Navbar } from "../Components/compIndex";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
const GradingPage = () => {
  const { appMarksData } = useAppContext();
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  
  useEffect(() => {
    console.log(`appData : ${JSON.stringify(appMarksData)}`);
    if (appMarksData) {
      setUserAnswers(appMarksData?.[0]?.Key || []);
      setCorrectAnswers(appMarksData?.[1]?.Key || []);
    } else {
      // Handle default data or loading state
      setUserAnswers(["", "", "", ""]);
      setCorrectAnswers(["", "", "", ""]);
    }
  }, [appMarksData]);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "Changes you made may not be saved."; // This message is necessary for some browsers to display the alert
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
}, []);

  const renderOMRRow = (index) => {
    const options = ["A", "B", "C", "D"];
    const spans = [];
    for (let i = 1; i <= correctAnswers.length; i++) {
      spans.push(<span key={i}>{`${i}`}</span>);
    }
    return (
      <div className="omr-row" key={index}>
        <div className="question-number">{spans[index]}</div>
        {options.map((option) => {
          let bubbleClass = "bubble";
          if (userAnswers[index] === option) {
            if (correctAnswers[index] === option) {
              bubbleClass += " correct"; // Correct answer marked by user
            } else {
              bubbleClass += " incorrect"; // Incorrect answer marked by user
            }
          } else if (!userAnswers[index] && correctAnswers[index] === option) {
            bubbleClass += " unattempted"; // Correct answer not attempted
          }
          return (
            <div className={`${bubbleClass} mx-4`} key={option}>
              {option}
            </div>
          );
        })}
      </div>
    );
  };

  const renderCorrectKey = (index) => {
    const options = ["A", "B", "C", "D"];
    const spans = [];
    for (let i = 1; i <= correctAnswers.length; i++) {
      spans.push(<span key={i}>{`${i}`}</span>);
    }
    return (
      <div className="omr-row" key={index}>
        <div className="question-number">{spans[index]}</div>
        {options.map((options) => {
          let keyBubbleClass = "bubble";
          if (correctAnswers[index] === options) {
            if (correctAnswers[index] === correctAnswers[index]) {
              keyBubbleClass += " correct"; // Correct answer marked by user
            }
          }
          return (
            <div className={`${keyBubbleClass} mx-4`} key={options}>
              {options}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex displayOMR justify-center mt-20">
        <div className="grading-page">
          <h1 className="title text-xl">Your Answer Key</h1>
          <div className="omr-sheet">
            {correctAnswers.map((_, index) => renderOMRRow(index))}
          </div>
        </div>
        <div className="grading-page">
          <h1 className="title text-xl">Real Answer Key</h1>
          <div className="omr-sheet">
            {correctAnswers.map((_, index) => renderCorrectKey(index))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GradingPage;
