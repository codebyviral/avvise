import { useEffect, useState } from "react";
import { Navbar, Footer, Modal } from "../Components/compIndex";
import { handleEnter } from "../app.js";
import "../App.css";
import { Steps } from "../assets/Driver-Step.js";
import CalculateFinal from "../Components/CalculateFinal.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const options = ["A", "B", "C", "D"];

const examSchemes = [
  { id: "noNegative", title: "IELTS / HSC", marks: "1 / 0" },
  { id: "jeeNeet", title: "JEE / NEET", marks: "4 / -1" },
  { id: "bitSat", title: "BITSAT / CAT", marks: "3 / -1" },
  { id: "upsc1", title: "UPSC Paper 2", marks: "2 / -0.66" },
  { id: "upsc2", title: "CSAT", marks: "2.5 / -0.83" },
  { id: "sscCgl", title: "SSC CGL", marks: "2 / -0.5" },
  { id: "Gate", title: "GATE / GMAT", marks: "1 / -0.33" },
  { id: "GRE", title: "GRE / SAT", marks: "1 / -0.25" },
];

const Calculator = () => {
  const { setAppQuestions, setNoOfQues, setMarkingType } = useAppContext();

  const [totalQues, setTotalQues] = useState([1, 2, 3, 4, 5]);
  const [userAnswers, setUserAnswers] = useState({});
  const [realAnswers, setRealAnswers] = useState({});
  const [markingScheme, setMarkingScheme] = useState("noNegative");
  const [isOpen, setIsOpen] = useState(false);

  const driverObj = driver({
    showProgress: true,
    steps: Steps,
  });

  useEffect(() => {
    handleEnter();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "calculatorAnswers",
      JSON.stringify({ userAnswers, realAnswers }),
    );
  }, [userAnswers, realAnswers]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("calculatorAnswers"));
    if (saved) {
      setUserAnswers(saved.userAnswers || {});
      setRealAnswers(saved.realAnswers || {});
    }
  }, []);

  const handleQuestionsNums = (e) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num) && num > 0) {
      const arr = Array.from({ length: num }, (_, i) => i + 1);
      setTotalQues(arr);
      setAppQuestions(arr);
      setNoOfQues(num);
    }
  };

  const selectUserAnswer = (num, opt) => {
    setUserAnswers((prev) => ({ ...prev, [num]: opt }));
    document.getElementById(`que-${num}`).value = opt;
  };

  const selectRealAnswer = (num, opt) => {
    setRealAnswers((prev) => ({ ...prev, [num]: opt }));
    document.getElementById(`answer-${num}`).value = opt;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progress = ((answeredCount / totalQues.length) * 100).toFixed(0);

  const driveTour = () => driverObj.drive();

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sticky Top Controls */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow p-4">
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <input
              id="que-num-input"
              type="number"
              min="1"
              placeholder="Total Questions"
              onChange={handleQuestionsNums}
              className="border p-2 rounded-lg w-48"
            />

            <div className="text-sm font-medium">
              Answered {answeredCount} / {totalQues.length}
            </div>

            <div className="w-40 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={driveTour}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Demo Tour
            </button>
          </div>
        </div>

        {/* Marking Schemes */}
        <div className="max-w-4xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {examSchemes.map((exam) => (
            <button
              key={exam.id}
              onClick={() => {
                setMarkingScheme(exam.id);
                setMarkingType(exam.id);
              }}
              className={`border rounded-lg p-3 text-center shadow
              ${
                markingScheme === exam.id
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              <div className="font-semibold">{exam.title}</div>
              <div className="text-sm">{exam.marks}</div>
            </button>
          ))}
        </div>

        <div className="text-center mt-4">
          <button onClick={toggleModal} className="underline">
            {`Can't`} find your marking system?
          </button>
        </div>

        {isOpen && <Modal />}

        {/* Question Navigator */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-10 gap-2">
          {totalQues.map((q) => (
            <button
              key={q}
              className={`border rounded text-sm p-1
                ${userAnswers[q] ? "bg-green-400 text-white" : "bg-white"}`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* OMR Answer Grid */}
        <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-8 px-4">
          {/* User Answers */}
          <div>
            <h3 className="font-bold text-center mb-4">Your Answers</h3>

            {totalQues.map((num) => (
              <div
                key={num}
                className="flex justify-center items-center gap-6 mb-3"
              >
                <span className="w-10 text-right font-medium">Q{num}</span>
                <div className="flex gap-3 justify-center">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => selectUserAnswer(num, opt)}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center ${userAnswers[num] === opt ? "bg-blue-500 text-white border-blue-500" : "bg-white hover:bg-gray-100"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <input type="hidden" id={`que-${num}`} />
              </div>
            ))}
          </div>

          {/* Real Answers */}
          <div>
            <h3 className="font-bold text-center mb-4">Real Answers</h3>
            {totalQues.map((num) => (
              <div
                key={num}
                className="flex justify-center items-center gap-6 mb-3"
              >
                <span className="w-10 text-right font-medium">Q{num}</span>

                <div className="flex gap-3 justify-center">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => selectRealAnswer(num, opt)}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center ${realAnswers[num] === opt ? "bg-blue-500 text-white border-blue-500" : "bg-white hover:bg-gray-100"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <input type="hidden" id={`answer-${num}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center mt-10">
          <CalculateFinal questions={totalQues} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export { Calculator };
