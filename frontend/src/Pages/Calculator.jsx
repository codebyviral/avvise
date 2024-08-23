import { useEffect, useState } from "react";
import { Navbar, Footer, Modal } from "../Components/compIndex";
import { handleEnter } from "../app.js";
import "../App.css";
import CalculateFinal from "../Components/CalculateFinal.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Calculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [totalQues, setTotalQues] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    handleEnter();
  });
  const { setAppQuestions, setNoOfQues, setMarkingType } = useAppContext();
  const renderInputs = () => {
    return totalQues.map((num, index) => (
      <div key={index} className="m-2 flex">
        <p className="number mt-5 mr-4 text-sm font-semibold text-gray-800 tracking-wide">
          {`A${num}.`}
        </p>
        <input
          id={`que-${num}`}
          type="text"
          className="input mt-3 border border-gray-300 p-2 rounded w-full"
          placeholder={`Input ${num}`}
        />
      </div>
    ));
  };
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: ".input-ques",
        popover: {
          title: "Getting Started by Entering the total number of Questions.",
          description:
            "Enter the number of total questions you have for example. 5",
        },
      },
      {
        element: ".marking_sys",
        popover: {
          title: "Choose your Marking system depending on your Exam.",
          description:
            "Select the marking system that corresponds to your exam requirements. For example, you might use a system like No Negative for Boards, JEE-NEET or even UPSC.",
        },
      },
      {
        element: ".newSystem-btn",
        popover: {
          title: "Incase you don't find your marking system or EXAM NAME",
          description:
            "Please click on this link and fill out the form to update our web app with your marking system. This will not only help you but also assist us in improving our app to reach more students.",
        },
      },
      {
        element: ".your-answer-key",
        popover: {
          title: "Enter Your Own Answer Key in Sequence",
          description:
            "Enter your answer key in sequence. For example, if your answer key is 'ADBC,' enter 'A' in input 1, 'D' in input 2, and so on.",
        },
      },
      {
        element: ".real-answer-key",
        popover: {
          title: "Enter Your Actual Answer Key",
          description:
            "Enter your answer key in sequence. For example, if your answer key is 'ABBC,' enter 'A' in input 1, 'B' in input 2, and so on.",
        },
      },
      {
        element: ".calculate-btn",
        popover: {
          title: "Calculate Your Result",
          description:
            "Once you have entered all your answers, click the 'Calculate' button to generate your result.",
        },
      },
    ],
  });
  const driveTour = () => {
    driverObj.drive();
  };
  const renderAnswerKeys = () => {
    return totalQues.map((num, index) => (
      <div key={index} className="m-2 flex">
        <p className="number mt-5 mr-4 text-sm font-semibold text-gray-800 tracking-wide">
          {`Q${num}.`}
        </p>

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
              className="input input-ques border border-gray-600 p-2  rounded-lg w-64 max-w-xs "
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
            className="mt-2 marking_sys lg:px-4 lg:py-1"
            value={markingScheme}
            name="markingSystem"
            id="marking-system"
            onChange={handleMarkingSchemeChange}
          >
            <option value="noNegative">
              IELTS || HSC || No Negative : 1/0
            </option>
            <option value="upsc1">UPSC : 2/0.66 (For Paper 2)</option>
            <option value="upsc2">CSAT : 2.5/0.83</option>
            <option value="jeeNeet">JEE || NEET : 4/1</option>
            <option value="bitSat">JEE Advanced || CAT || BITSAT : 3/1</option>
            <option value="sscCgl">SSC CGL : 2/0.5</option>
            <option value="Gate">GATE || GMAT : 1/0.33</option>
            <option value="GRE">GRE || MAT || SAT || : 1/0.25</option>
          </select>
        </div>
        <div className="newSystem text-center mt-4 cursor-pointer">
          <button
            onClick={toggleModal}
            className="modal-btn underline newSystem-btn"
          >
            {`Can't`} find your marking system?
          </button>
        </div>
        {isOpen ? (
          <>
            <Modal />
          </>
        ) : (
          <></>
        )}
        <div className="flex inputKeys items-center mt-10">
          <div className="flex">
            <div className="w-1/2 p-2">
              <h3 className="mb-4 font-semibold text-center">
                Your Answer Key
              </h3>
              <div className="your-answer-key">{renderInputs()}</div>
            </div>
            <div className="w-1/2 p-2">
              <h3 className="mb-4 font-semibold text-center">
                Real Answer Key
              </h3>
              <div className="real-answer-key">{renderAnswerKeys()}</div>
            </div>
          </div>
        </div>
        <>
          <div className="flex justify-center">
            <button
              onClick={driveTour}
              className="bg-black mt-10 px-6 py-2.5 mx-3 mb-10 rounded-2xl hover:opacity-80 text-white dark:bg-purple-600"
            >
              Demo Tour
            </button>
            <CalculateFinal questions={totalQues} />
          </div>
        </>
      </div>
      <Footer />
    </>
  );
};

export { Calculator };
