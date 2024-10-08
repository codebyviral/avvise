import "./OMRSheet.css";
import { Navbar, Footer } from "../Components/compIndex";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { currentDate } from "../assets/Date";
const GradingPage = () => {
  const { appMarksData, resultDisplay, historyId } = useAppContext();
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [history, setHistory] = useState({
    id: "",
    totalMarks: "",
    maxMarks: "",
    maxQuestions: "",
    appUserAnswerKey: "",
    appRealAnswerKey: "",
    totalCorrect: "",
    totalIncorrect: "",
    totalUnattempted: "",
  });
  useEffect(() => {
    if (appMarksData) {
      setUserAnswers(appMarksData?.[0]?.Key || []);
      setCorrectAnswers(appMarksData?.[1]?.Key || []);
    } else {
      setUserAnswers(["", "", "", ""]);
      setCorrectAnswers(["", "", "", ""]);
    }
  }, [resultDisplay, appMarksData, historyId]);
  useEffect(() => {
    if (historyId !== null) {
      const historyDataString =
        window.localStorage.getItem("calculatedHistory");
      if (historyDataString) {
        const historyData = JSON.parse(historyDataString);
        const selectedHistoryEntry = historyData.find(
          (entry) => entry.id === historyId
        );
        if (selectedHistoryEntry) {
          setUserAnswers(selectedHistoryEntry.userAnswerKey || []);
          setCorrectAnswers(selectedHistoryEntry.appRealAnswerKey || []);
          setHistory((prevHistory) => ({
            ...prevHistory,
            id: selectedHistoryEntry.id,
            totalMarks: selectedHistoryEntry.totalMarks,
            maxQuestions: selectedHistoryEntry.maxQuestions,
            maxMarks: selectedHistoryEntry.maxMarks,
            appUserAnswerKey: selectedHistoryEntry.appUserAnswerKey,
            appRealAnswerKey: selectedHistoryEntry.appRealAnswerKey,
            totalCorrect: selectedHistoryEntry.totalCorrect,
            totalIncorrect: selectedHistoryEntry.totalIncorrect,
            totalUnattempted: selectedHistoryEntry.totalUnattempted,
          }));
        } else {
          console.log(`History entry with id ${historyId} not found.`);
        }
      } else {
        console.log("No history data found in localStorage.");
      }
    } else {
      console.log("historyId not set.");
    }
  }, [historyId]);
  useEffect(() => {
    window.scrollTo(0, 0);
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
          if (userAnswers && userAnswers[index] === option) {
            bubbleClass +=
              correctAnswers[index] === option ? " correct" : " incorrect";
          } else if (!userAnswers[index] && correctAnswers[index] === option) {
            bubbleClass += " unattempted";
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
  const element = document.querySelector("#pdf-omr");
  var fileOptions = {
    filename: `avvise-${currentDate}.pdf`,
  };
  const savePDF = () => {
    document.getElementById("displayOnPrint").style.display = "block";
    html2pdf().from(element).set(fileOptions).save();
  };
  return (
    <>
      <Navbar />
      <div className="marksDisplay w-full p-2 font-semibold h-12 text-black">
        <div className="flex justify-center">
          <h1 className="text-xl mt-5">OMR Results</h1>
        </div>
      </div>
      <div id="pdf-omr" className="min-h-screen">
        <div className="outerSummaryDiv p-5">
          <div className="summaryDiv w-full h-9 mt-5 font-semibold text-xl lg:ml-24 lg:text-3xl">
            <div id="hideOnPrint" className="flex">
              <h1 className="lg:float-left">Results Summary</h1>
              <button
                onClick={() => {
                  savePDF();
                }}
                className="Btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  className="svgIcon"
                >
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                </svg>
                <span className="icon2"></span>
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid mr-4 grid-cols-4 text-black">
              <div className="testResults mt-5 lg:mt-10 lg:h-5/6 lg:min-w-48  lg:mx-10 lg:border p-3 rounded-lg lg:bg-white text-center lg:px-20 lg:shadow-xl">
                <p className="lg:text-xl text-sm font-semibold whitespace-nowrap">
                  Total Marks
                </p>
                <h6 className="lg:text-2xl text-sm lg:font-semibold mt-2 font-semibold">
                  {(resultDisplay.totalMarks &&
                    resultDisplay.totalMarks.toFixed(2)) ||
                    (history.totalMarks && history.totalMarks.toFixed(1)) ||
                    "0"}{" "}
                  / {resultDisplay.maxMarksPossible || history.maxMarks || "0"}
                </h6>
              </div>
              <div className="testResults ml-2 mt-5 whitespace-nowrap lg:mt-10 lg:h-5/6 lg:min-w-48 lg:text-2xl lg:mx-10 lg:border p-3 rounded-lg lg:bg-white text-center lg:px-20 lg:shadow-xl">
                <p className="lg:text-xl text-sm whitespace-nowrap caption-toolkit font-semibold">
                  Correct <span className="hidden md:inline">Answers</span>
                </p>
                <h6 className="lg:text-2xl text-sm lg:font-semibold text-green-600 mt-2 font-semibold">
                  {resultDisplay.totalCorrect || history.totalCorrect || "0"} /
                  {resultDisplay.maxQuestions || history.maxQuestions || "0"}
                </h6>
              </div>
              <div className="testResults mt-5 lg:mt-10 lg:h-5/6 lg:min-w-48 lg:text-2xl lg:mx-10 lg:border p-3 rounded-lg lg:bg-white text-center lg:px-20 lg:shadow-xl">
                <p className="lg:text-xl text-sm whitespace-nowrap caption-toolkit font-semibold">
                  Inorrect <span className="hidden md:inline">Answers</span>
                </p>
                <h6 className="lg:text-2xl lg:font-semibold text-sm font-semibold text-red-500 mt-2">
                  {resultDisplay.totalIncorrect ||
                    history.totalIncorrect ||
                    "0"}{" "}
                  / {resultDisplay.maxQuestions || history.maxQuestions || "0"}
                </h6>
              </div>
              <div className="testResults mt-5 lg:mt-10 lg:h-5/6 lg:min-w-48 lg:text-2xl lg:mx-10 lg:border p-3 rounded-lg lg:bg-white text-center lg:px-20 lg:shadow-xl">
                <p className="lg:text-xl text-sm font-semibold">Unattempted</p>
                <h6 className="lg:text-2xl text-sm lg:font-semibold text-yellow-500 mt-2 font-semibold">
                  {resultDisplay.totalUnattempted ||
                    history.totalUnattempted ||
                    "0"}{" "}
                  / {resultDisplay.maxQuestions || history.maxQuestions || "0"}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="flex displayOMR justify-center mt-10">
          <div className="grading-page">
            <h1 className="title text-xl font-semibold">Your Answer Key</h1>
            <div className="omr-sheet">
              {correctAnswers.map((_, index) => renderOMRRow(index))}
            </div>
          </div>
          <div className="grading-page">
            <h1 className="title text-xl font-semibold">Real Answer Key</h1>
            <div className="omr-sheet">
              {correctAnswers.map((_, index) => renderCorrectKey(index))}
            </div>
          </div>
        </div>
        <div
          hidden
          id="displayOnPrint"
          className="displayPrint text-center mt-20"
        >
          <p className="font-light">
            This was generated by AVVISE. Discover more at avvise.vercel.app.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GradingPage;
