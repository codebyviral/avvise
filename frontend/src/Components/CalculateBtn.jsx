/* eslint-disable no-unused-vars */
import React from "react";
import { useAppContext } from "../context/AppContext";
const totalQues = [1, 2, 3, 4];
const userAnswers = [];
const realAnswers = [];
const finalAnswers = [
  {
    id: 0,
    user: [],
  },
  {
    id: 1,
    real: [],
  },
];
const CalculateBtn = () => {
  const Calculate = () => {
    totalQues.map((num, index) => {
      userAnswers[index] = document.getElementById(`que-${num}`).value;
      realAnswers[index] = document.getElementById(`answer-${num}`).value;
    });
    const appUserAnsweryKey = userAnswers.map((el) => el.toUpperCase());
    const appRealAnswerKey = realAnswers.map((el) => el.toUpperCase());
    console.log(appUserAnsweryKey);
    console.log(appRealAnswerKey);
    finalAnswers[0].user.push(...userAnswers);
    finalAnswers[1].real.push(...realAnswers);

    const compareAnswers = (u, r) => {
      let correct = 0;
      let incorrect = 0;
      let unAttempted = 0;
      u.forEach((userAns, index) => {
        const realAns = r[index];

        if (userAns !== "" && userAns == realAns) {
          correct++;
        } else if (userAns !== "" && userAns !== realAns) {
          incorrect++;
        } else {
          unAttempted++;
        }
      });
      console.log(`Correct answers: ${correct}`);
      let totalCorrect = correct;
      console.log(`Incorrect answers: ${incorrect}`);
      let totalIncorrect = incorrect;
      console.log(`Unattempted questions: ${unAttempted}`);
      let totalUnattempted = unAttempted;
      return [
        { name: "totalCorrect", corrects: totalCorrect },
        { name: "totalIncorrect", incorrects: totalIncorrect },
        { name: "totalUnattempted", unattempted: totalUnattempted },
      ];
    };
    const appMarksData = compareAnswers(appUserAnsweryKey, appRealAnswerKey);
  };
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={Calculate}
          className="bg-blue-600 mt-10 px-6 py-2.5 rounded-lg hover:bg-blue-700 text-white"
        >
          Calculate
        </button>
      </div>
    </>
  );
};

export default CalculateBtn;
