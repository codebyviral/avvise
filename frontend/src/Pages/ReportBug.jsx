import { Navbar, Footer } from "../Components/compIndex";
import { useEffect } from "react";
import { useState } from "react";

const ReportBug = () => {
  const [faqItems, setFaqItems] = useState([
    {
      question:
        "How do I get started by entering the total number of questions?",
      answer:
        "To begin, simply enter the total number of questions you have. For example, if your exam has 50 questions, input '50' into the designated field.",
      isOpen: false,
    },
    {
      question: "How do I choose my marking system for the exam?",
      answer:
        "Select the marking system that best suits your exam requirements. For instance, you may choose systems like 'No Negative' for competitive exams such as Boards, JEE-NEET, or UPSC.",
      isOpen: false,
    },
    {
      question: "What if I don't find my marking system or exam listed?",
      answer:
        "If your marking system or exam is not listed, please click on the Can't find your marking system? link and fill out the form provided. Your contribution will help us improve our app for a broader audience of students.",
      isOpen: false,
    },
    {
      question: "How do I enter my own answer key in sequence?",
      answer:
        "Enter your answer key in the order provided. Which is located on the left-side. For example, if your answer key is 'ADBC,' input 'A' into the first field, 'D' into the second, 'B' into the third, and 'C' into the fourth.",
      isOpen: false,
    },
    {
      question: "How do I enter the actual answer key for the exam?",
      answer:
        "Enter your actual answer key in sequence.  Which is located on the right-side. For example, if your answer key is 'ABBC,' input 'A' into the first field, 'B' into the second, and 'B' into the third and fourth fields respectively.",
      isOpen: false,
    },
    {
      question: "How do I calculate my exam result?",
      answer:
        "Once you have entered all your answers and chosen the appropriate marking system, click on the 'Calculate' button to generate your exam result instantly.",
      isOpen: false,
    },
  ]);

  useEffect(() => {
    let elements = document.querySelectorAll("[data-menu]");
    elements.forEach((main) => {
      main.addEventListener("click", () => {
        let element = main.parentElement;
        let indicators = main.querySelectorAll("img");
        let child = element.querySelector(".menu");
        let h = element.querySelector(".mainHeading p");

        h.classList.toggle("font-semibold");
        child.classList.toggle("hidden");
        indicators.forEach((img) => img.classList.toggle("rotate-180"));
      });
    });
  }, []);

  const toggleFAQ = (index) => {
    const updatedFaqItems = [...faqItems];
    updatedFaqItems[index].isOpen = !updatedFaqItems[index].isOpen;
    setFaqItems(updatedFaqItems);
  };

  return (
    <>
      <Navbar />
      <div className="lg:container lg:mx-auto lg:py-16 md:py-12 py-12 px-4 flex flex-col lg:flex-row">
        {/* Left Column - FAQs */}
        <div className="lg:w-2/3 lg:pr-8">
          <h1 className="text-center dark:text-white lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">
            FAQ's
          </h1>

          {faqItems.map((faq, index) => (
            <div key={index} className="my-8">
              <div
                className="flex justify-between items-center cursor-pointer"
                data-menu={`menu${index}`}
                onClick={() => toggleFAQ(index)}
              >
                <p className="flex items-center dark:text-white font-medium text-lg leading-6 lg:text-2xl md:text-xl text-base leading-6 md:leading-5 lg:leading-4 text-gray-800">
                  <span className="lg:mr-6 mr-4 dark:text-white font-semibold">
                    Q{index + 1}.
                  </span>
                  {faq.question}
                </p>
                <button
                  aria-label="Toggle"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                >
                  <img
                    className={`transform ${faq.isOpen ? "rotate-180" : ""}`}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2.svg"
                    alt="toggle"
                  />
                </button>
              </div>
              <div
                className={`menu mt-6 text-gray-600 dark:text-gray-300 ${
                  faq.isOpen ? "" : "hidden"
                }`}
              >
                <p className="text-base leading-6">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Reporting Form */}
        <div className="lg:w-1/3 lg:pl-8 mt-8 lg:mt-0">
          <div className="bg-white max-w-lg md:max-w-2xl lg:max-w-4xl p-10 md:rounded-lg shadow-lg">
            <form action="https://formspree.io/f/myzgzloe" method="POST">
              <h1 className="font-bold text-2xl text-center mb-6">
                Report a Bug or Request a Feature
              </h1>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  I would like to:
                </label>
                <select
                  name="Report-Type"
                  className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm focus:outline-none"
                  defaultValue="select"
                >
                  <option value="select" disabled>
                    Select an option
                  </option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Request a Feature</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="Report-Title"
                  className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm focus:outline-none"
                  placeholder="Enter a title"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="Report-Description"
                  className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm focus:outline-none"
                  rows="4"
                  placeholder="Enter your description"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-black text-white rounded-lg shadow-lg px-4 py-2 hover:opacity-90 font-semibold focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportBug;
