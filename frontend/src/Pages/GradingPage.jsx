import "./OMRSheet.css";
import { Navbar } from "../Components/compIndex";
import { appData } from "../app";
import { useEffect } from "react";
const GradingPage = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log(appData.appMarksData);
    }, 1000);
  }, []);
  const userAnswers = ["A", "B", "A", "A", "C"];
  const correctAnswers = ["A", "B", "C", "D", "C"];

  const renderOMRRow = (index) => {
    const options = ["A", "B", "C", "D"];
    return (
      <div className="omr-row" key={index}>
        <div className="question-number">{String.fromCharCode(65 + index)}</div>
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
            console.log(`options : ${options}`);
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
