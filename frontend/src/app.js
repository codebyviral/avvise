/* eslint-disable no-unused-vars */
function handleEnter() {

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
}
const totalQues = [1, 2, 3, 4];
const userAnswers = [];
const realAnswers = [];

const appData = {
    appMarksData: [],
}

const finalAnswers = [{
    id: 0,
    user: []
}, {
    id: 1,
    real: [],
}]

const Calculate = () => {
    totalQues.map((num, index) => {
        userAnswers[index] = document.getElementById(`que-${num}`).value;
        realAnswers[index] = document.getElementById(`answer-${num}`).value
    })
    const appUserAnsweryKey = userAnswers.map((el) => el.toUpperCase())
    const appRealAnswerKey = realAnswers.map((el) => el.toUpperCase())
    console.log(appUserAnsweryKey)
    console.log(appRealAnswerKey)
    finalAnswers[0].user.push(...userAnswers)
    finalAnswers[1].real.push(...realAnswers)

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
        })
        let totalCorrect = console.log(`Correct answers: ${correct}`);
        let totalIncorrect = console.log(`Incorrect answers: ${incorrect}`);
        let totalUnattempted = console.log(`Unattempted questions: ${unAttempted}`);
        return [
            { name: 'totalCorrect', corrects: totalCorrect, },
            { name: 'totalIncorrect', incorrects: totalIncorrect },
            { name: 'totalUnattempted', unattempted: totalUnattempted, }
        ]
    }
    appData.appMarksData = compareAnswers(appUserAnsweryKey, appRealAnswerKey,)
    return appData.appMarksData
}

export { handleEnter, Calculate, appData }
