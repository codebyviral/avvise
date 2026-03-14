// const Steps = [
//     {
//         element: ".input-ques",
//         popover: {
//             title: "Getting Started by Entering the total number of Questions.",
//             description:
//                 "Enter the number of total questions you have for example. 5",
//         },
//     },
//     {
//         element: ".marking_sys",
//         popover: {
//             title: "Choose your Marking system depending on your Exam.",
//             description:
//                 "Select the marking system that corresponds to your exam requirements. For example, you might use a system like No Negative for Boards, JEE-NEET or even UPSC.",
//         },
//     },
//     {
//         element: ".newSystem-btn",
//         popover: {
//             title: "Incase you don't find your marking system or EXAM NAME",
//             description:
//                 "Please click on this link and fill out the form to update our web app with your marking system. This will not only help you but also assist us in improving our app to reach more students.",
//         },
//     },
//     {
//         element: ".your-answer-key",
//         popover: {
//             title: "Enter Your Own Answer Key in Sequence",
//             description:
//                 "Enter your answer key in sequence. For example, if your answer key is 'ADBC,' enter 'A' in input 1, 'D' in input 2, and so on.",
//         },
//     },
//     {
//         element: ".real-answer-key",
//         popover: {
//             title: "Enter Your Actual Answer Key",
//             description:
//                 "Enter your answer key in sequence. For example, if your answer key is 'ABBC,' enter 'A' in input 1, 'B' in input 2, and so on.",
//         },
//     },
//     {
//         element: ".calculate-btn",
//         popover: {
//             title: "Calculate Your Result",
//             description:
//                 "Once you have entered all your answers, click the 'Calculate' button to generate your result.",
//         },
//     },
// ]
// export { Steps }

// New Steps : //
export const Steps = [
  {
    element: "#que-num-input",
    popover: {
      title: "Total Questions",
      description: "Enter the total number of questions in your exam.",
    },
  },
  {
    element: "#marking-schemes",
    popover: {
      title: "Marking Scheme",
      description: "Choose the marking system used in your exam.",
    },
  },
  {
    element: "#user-answers",
    popover: {
      title: "Your Answers",
      description: "Select the answers you marked.",
    },
  },
  {
    element: "#real-answers",
    popover: {
      title: "Correct Answers",
      description: "Enter the official answer key.",
    },
  },
  {
    element: "#progress-bar",
    popover: {
      title: "Progress",
      description: "Shows how many questions you answered.",
    },
  },
  {
    element: "#calculate-btn",
    popover: {
      title: "Calculate Result",
      description: "Click here to calculate your score.",
    },
  },
];
