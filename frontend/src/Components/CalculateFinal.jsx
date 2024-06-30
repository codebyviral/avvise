import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const CalculateFinal = () => {
  const { setAppMarksData, appQuestions, noOfQues } = useAppContext();
  const navigate = useNavigate();

  const handleCalculation = () => {
    if (noOfQues === 0) {
      console.log(noOfQues);
      alert("No. of Questions cannot be Zero!");
      return;
    } else if (noOfQues === "" || noOfQues === null) {
      console.log(noOfQues);
      alert("No. of Questions cannot be Empty!");
      return;
    }
    console.log(appQuestions);
    const totalQues = appQuestions;
    const userAnswers = [];
    const realAnswers = [];

    totalQues.forEach((num, index) => {
      userAnswers[index] = document.getElementById(`que-${num}`).value;
      realAnswers[index] = document.getElementById(`answer-${num}`).value;
    });

    const appUserAnsweryKey = userAnswers.map((el) => el.toUpperCase());
    const appRealAnswerKey = realAnswers.map((el) => el.toUpperCase());
    const compareAnswers = (u, r) => {
      let correct = 0;
      let incorrect = 0;
      let unAttempted = 0;

      u.forEach((userAns, index) => {
        const realAns = r[index];
        if (userAns !== "" && userAns === realAns) {
          correct++;
        } else if (userAns !== "" && userAns !== realAns) {
          incorrect++;
        } else {
          unAttempted++;
        }
      });

      return [
        { name: "totalCorrect", corrects: correct },
        { name: "totalIncorrect", incorrects: incorrect },
        { name: "totalUnattempted", unattempted: unAttempted },
      ];
    };

    const newappMarkData = compareAnswers(appUserAnsweryKey, appRealAnswerKey);
    const OMRKey = [{ Key: appUserAnsweryKey }, { Key: appRealAnswerKey }];
    setAppMarksData(OMRKey);

    // Delay navigation to ensure state is set
    setTimeout(() => navigate("/projects"), 0);
  };

  return (
    <div className="flex justify-center">
      {/* Add a button or any event trigger to call handleCalculation */}
      <button
        className="bg-blue-600 mt-10 px-6 py-2.5 rounded-lg hover:bg-blue-700 text-white dark:bg-purple-600"
        onClick={handleCalculation}
      >
        Calculate
      </button>
    </div>
  );
};

export default CalculateFinal;
