import { useEffect, useState } from "react";
import { Navbar, Footer } from "../Components/compIndex";
import { handleEnter } from "../app.js";
import "../App.css";
import CalculateFinal from "../Components/CalculateFinal.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const Calculator = () => {
  const [totalQues, setTotalQues] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    handleEnter();
  });
  const { setAppQuestions, setNoOfQues, setMarkingType } = useAppContext();

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
      let newTotalQues = Array.from({ length: num }, (_, i) => i + 1);
      setTotalQues(newTotalQues);
      setAppQuestions(newTotalQues);
      setNoOfQues(num);
    }
  };
  const [markingScheme, setMarkingScheme] = useState("noNegative");
  const handleMarkingSchemeChange = (e) => {
    setMarkingScheme(e.target.value);
    setMarkingType(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
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
        <div className="markingSystemDiv text-center">
          <h6>Choose Your Marking System:</h6>
          <select
            className="mt-2 lg:px-4 lg:py-1"
            value={markingScheme}
            name="markingSystem"
            id="marking-system"
            onChange={handleMarkingSchemeChange}
          >
            <option value="noNegative">No Negative Marking : 1/0</option>
            <option value="jeeNeet">JEE || NEET : 4/1</option>
            <option value="bitSat">BITSAT : 3/1</option>
            <option value="upsc">{`UPSC : 2/(1/3) also known as 2/0.66`}</option>
          </select>
        </div>
        <div className="flex inputKeys items-center mt-10">
          <div className="flex">
            <div className="w-1/2 p-2">
              <h3 className="mb-4 font-semibold text-center">
                Your Answer Key
              </h3>
              {renderInputs()}
            </div>
            <div className="w-1/2 p-2">
              <h3 className="mb-4 font-semibold text-center">
                Real Answer Key
              </h3>
              {renderAnswerKeys()}
            </div>
          </div>
        </div>
        <CalculateFinal questions={totalQues} />
      </div>
      <Footer />
    </>
  );
};

export { Calculator };
