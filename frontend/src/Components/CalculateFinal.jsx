import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const CalculateFinal = () => {
  const [markScheme, setMarkScheme] = useState({
    positiveMarks: 1,
    negativeMarks: 0,
  });
  const {
    setAppMarksData,
    appQuestions,
    noOfQues,
    setResultDisplay,
    markingType,
  } = useAppContext();
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

      let scheme = { positiveMarks: 1, negativeMarks: 0 };

      // setting Marking Type
      if (markingType === "noNegative") {
        scheme = {
          positiveMarks: 1,
          negativeMarks: 0,
        };
      } else if (markingType === "jeeNeet") {
        scheme = {
          positiveMarks: 4,
          negativeMarks: 1,
        };
      } else if (markingType === "bitSat") {
        scheme = {
          positiveMarks: 3,
          negativeMarks: 1,
        };
      } else if (markingType === "upsc") {
        scheme = {
          positiveMarks: 2,
          negativeMarks: 1 / 3,
        };
      }

      // final result::
      const totalMarks = parseInt(correct * scheme.positiveMarks);
      console.log(`total marks are: ${scheme.positiveMarks}`);
      const totalIncorrect = incorrect * scheme.negativeMarks;
      const finalMarks = totalMarks - totalIncorrect;
      setResultDisplay({
        totalMarks: finalMarks,
        totalCorrect: correct,
        totalIncorrect: incorrect,
        totalUnattempted: unAttempted,
      });
      return [
        { name: "totalMarks", corrects: finalMarks },
        { name: "totalIncorrect", incorrects: incorrect },
        { name: "totalUnattempted", unattempted: unAttempted },
      ];
    };

    const newappMarkData = compareAnswers(appUserAnsweryKey, appRealAnswerKey);
    console.log(`app mark data ${newappMarkData}`);
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
