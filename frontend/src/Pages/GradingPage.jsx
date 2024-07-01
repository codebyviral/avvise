import "./OMRSheet.css";
import { Navbar } from "../Components/compIndex";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const GradingPage = () => {
  const { appMarksData, resultDisplay } = useAppContext();
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    console.log(resultDisplay);
    if (appMarksData) {
      setUserAnswers(appMarksData?.[0]?.Key || []);
      setCorrectAnswers(appMarksData?.[1]?.Key || []);
    } else {
      // Handle default data or loading state
      setUserAnswers(["", "", "", ""]);
      setCorrectAnswers(["", "", "", ""]);
    }
  }, [appMarksData]);

  const renderOMRRow = (index) => {
    const options = ["A", "B", "C", "D"];
    const spans = [];
    for (let i = 1; i <= correctAnswers.length; i++) {
      spans.push(<span key={i}>{`${i}`}</span>);
    }
    return (
      <div
        className="omr-row flex flex-col md:flex-row items-center md:justify-between"
        key={index}
      >
        <div className="question-number">{spans[index]}</div>
        <div className="flex">
          {options.map((option) => {
            let bubbleClass = "bubble";
            if (userAnswers[index] === option) {
              if (correctAnswers[index] === option) {
                bubbleClass += " correct"; // Correct answer marked by user
              } else {
                bubbleClass += " incorrect"; // Incorrect answer marked by user
              }
            } else if (
              !userAnswers[index] &&
              correctAnswers[index] === option
            ) {
              bubbleClass += " unattempted"; // Correct answer not attempted
            }
            return (
              <div className={`${bubbleClass} mx-4`} key={option}>
                {option}
              </div>
            );
          })}
        </div>
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
      <div
        className="omr-row flex flex-col md:flex-row items-center md:justify-between"
        key={index}
      >
        <div className="question-number">{spans[index]}</div>
        <div className="flex">
          {options.map((option) => {
            let keyBubbleClass = "bubble";
            if (correctAnswers[index] === option) {
              keyBubbleClass += " correct"; // Correct answer marked by user
            }
            return (
              <div className={`${keyBubbleClass} mx-4`} key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="marksDisplay w-full p-2 font-semibold h-12 text-white">
        <div className="flex justify-center">
          <h1 className="text-xl">OMR Results</h1>
        </div>
      </div>
      <div className="outerSummaryDiv p-5">
        <div className="summaryDiv w-full h-9 mt-5 font-semibold text-xl lg:ml-24 lg:text-3xl">
          <h1 className="lg:float-left">Results Summary</h1>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-4 text-black gap-4">
            <div className="testResults mt-4 lg:mt-10 h-auto lg:h-5/6 lg:min-w-48 border p-3 rounded-lg bg-white text-center lg:px-20 shadow-xl">
              <p className="text-lg lg:text-xl">Total Marks</p>
              <h6 className="text-xl lg:text-2xl font-semibold mt-2">
                {resultDisplay.totalMarks || "0"}
              </h6>
            </div>
            <div className="testResults mt-4 lg:mt-10 h-auto lg:h-5/6 lg:min-w-48 border p-3 rounded-lg bg-white text-center lg:px-20 shadow-xl">
              <p className="text-lg lg:text-xl">Correct Answers</p>
              <h6 className="text-xl lg:text-2xl font-semibold text-green-600 mt-2">
                {resultDisplay.totalCorrect || "0"}
              </h6>
            </div>
            <div className="testResults mt-4 lg:mt-10 h-auto lg:h-5/6 lg:min-w-48 border p-3 rounded-lg bg-white text-center lg:px-20 shadow-xl">
              <p className="text-lg lg:text-xl">Incorrect Answers</p>
              <h6 className="text-xl lg:text-2xl font-semibold text-yellow-500 mt-2">
                {resultDisplay.totalIncorrect || "0"}
              </h6>
            </div>
            <div className="testResults mt-4 lg:mt-10 h-auto lg:h-5/6 lg:min-w-48 border p-3 rounded-lg bg-white text-center lg:px-20 shadow-xl">
              <p className="text-lg lg:text-xl">Unattempted</p>
              <h6 className="text-xl lg:text-2xl font-semibold text-gray-500 mt-2">
                {resultDisplay.totalUnattempted || "0"}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row displayOMR justify-center mt-20 gap-10">
        <div className="grading-page">
          <h1 className="title text-xl font-semibold text-center lg:text-left">
            Your Answer Key
          </h1>
          <div className="omr-sheet">
            {correctAnswers.map((_, index) => renderOMRRow(index))}
          </div>
        </div>
        <div className="grading-page">
          <h1 className="title text-xl font-semibold text-center lg:text-left">
            Real Answer Key
          </h1>
          <div className="omr-sheet">
            {correctAnswers.map((_, index) => renderCorrectKey(index))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GradingPage;
