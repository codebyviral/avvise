import { useEffect } from "react";
import { Navbar } from "../Components/compIndex";
import { handleEnter } from "../app.js";
import "../App.css";
import CalculateFinal from "../Components/CalculateFinal.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const Calculator = () => {
  const totalQues = [1, 2, 3, 4, 5, 6, 7];
  useEffect(() => {
    handleEnter();
  });
  const { setAppQuestions } = useAppContext();
  useEffect(() => {
    setAppQuestions(totalQues);
  }, []);

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

  return (
    <>
      <Navbar />
      <div className="flex inputKeys items-center mt-20">
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
