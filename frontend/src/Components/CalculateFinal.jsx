import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const CalculateFinal = () => {
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
      } else if (markingType === "upsc1") {
        scheme = {
          positiveMarks: 2,
          negativeMarks: 1 / 3,
        };
      } else if (markingType === "upsc2") {
        scheme = {
          positiveMarks: 2,
          negativeMarks: 0.83,
        };
      } else if (markingType === "sscCgl") {
        scheme = {
          positiveMarks: 2,
          negativeMarks: 1 / 2,
        };
      } else if (markingType === "Gate") {
        scheme = {
          positiveMarks: 1,
          negativeMarks: 0.33,
        };
      } else if (markingType === "GRE") {
        scheme = {
          positiveMarks: 1,
          negativeMarks: 0.25,
        };
      }

      // final result::
      const totalMarks = parseInt(correct * scheme.positiveMarks);
      const maxMarks = realAnswers.length * scheme.positiveMarks;
      console.log(`total marks are: ${scheme.positiveMarks}`);
      const totalIncorrect = incorrect * scheme.negativeMarks;
      const finalMarks = totalMarks - totalIncorrect;
      setResultDisplay({
        totalMarks: finalMarks,
        maxMarksPossible: maxMarks,
        maxQuestions: appRealAnswerKey.length,
        totalCorrect: correct,
        totalIncorrect: incorrect,
        totalUnattempted: unAttempted,
      });

      // Getting existing history for adding array index.
      const existingHistory =
        JSON.parse(window.localStorage.getItem("calculatedHistory")) || [];
      const getMaxId = (history) => {
        if (history.length === 0) {
          return 0;
        }
        return Math.max(...history.map((item) => item.id)) + 1;
      };

      const newEntry = {
        id: getMaxId(existingHistory),
        userAnswerKey: appUserAnsweryKey,
        appRealAnswerKey: appRealAnswerKey,
        maxMarks: maxMarks,
        maxQuestions: appRealAnswerKey.length,
        totalMarks: finalMarks,
        totalCorrect: correct,
        totalIncorrect: incorrect,
        totalUnattempted: unAttempted,
        timeStamp: new Date().toISOString(),
      };
      existingHistory.push(newEntry);
      window.localStorage.setItem(
        "calculatedHistory",
        JSON.stringify(existingHistory)
      );
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
      <button
        className="bg-black mt-10 px-6 py-2.5 mx-3 mb-10 rounded-2xl hover:opacity-80 text-white dark:bg-purple-600"
        onClick={driveTour}
      >
        Demo Tour
      </button>
      <button
        className="bg-black calculate-btn mt-10 px-6 py-2.5 mx-3 mb-10 rounded-2xl hover:opacity-80 text-white dark:bg-purple-600"
        onClick={handleCalculation}
      >
        Calculate
      </button>
    </div>
  );
};

export default CalculateFinal;
