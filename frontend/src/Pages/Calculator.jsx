import { useEffect, useState } from "react";
import { Navbar } from "../Components/compIndex";
import { handleEnter } from "../app.js";
import "../App.css";
import CalculateFinal from "../Components/CalculateFinal.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const Calculator = () => {
  const [totalQues, setTotalQues] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    handleEnter();
  });
  const { setAppQuestions } = useAppContext();

  const renderInputs = () => {
    return totalQues.map((num, index) => (
      <div key={index} className="m-2">
        <input
          id={`que-${num}`}
          type="text"
          className="input mt-3 border border-gray-300 p-2 rounded w-full"
          placeholder={`Input ${num}`}
        />
      </div>
    ));
  };

  const renderAnswerKeys = () => {
    return totalQues.map((num, index) => (
      <div key={index} className="m-2">
        <input
          id={`answer-${num}`}
          type="text"
          className="input mt-3 border border-gray-300 p-2 rounded w-full"
          placeholder={`Answer ${num}`}
        />
      </div>
    ));
  };
  const handleQuestionsNums = (e) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num) && num > 0) {
      const newTotalQues = Array.from({ length: num }, (_, i) => i + 1);
      setTotalQues(newTotalQues);
      setAppQuestions(newTotalQues);
      console.log(`totalQues Array : ${newTotalQues}`);
    }
  };
  return (
    <>
      <Navbar />
      <div className="totalOuterQuestions h-20 mt-20">
        <div className="flex justify-center mt-10">
          <input
            id="que-num-input"
            className="input border border-gray-600 p-2  rounded-lg w-30 max-w-xs "
            placeholder="Enter No. Total Questions"
            onChange={handleQuestionsNums}
            type="number"
            min="1"
          />
        </div>
      </div>
      <div className="flex inputKeys items-center mt-10">
        <div className="flex">
          <div className="w-1/2 p-2">
            <h3 className="mb-4 font-semibold text-center">Your Answer Key</h3>
            {renderInputs()}
          </div>
          <div className="w-1/2 p-2">
            <h3 className="mb-4 font-semibold text-center">Real Answer Key</h3>
            {renderAnswerKeys()}
          </div>
        </div>
      </div>
      <CalculateFinal questions={totalQues} />
    </>
  );
};

export { Calculator };
