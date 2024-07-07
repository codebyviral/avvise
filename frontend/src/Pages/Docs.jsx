import { Navbar, Footer } from "../Components/compIndex";
const Docs = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">AVVISE Documentation</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Using AVVISE for Grading
          </h2>
          <p className="text-lg mb-4">
            AVVISE is a powerful tool designed to simplify the grading process
            for assessments, exams, and quizzes. This documentation provides a
            step-by-step guide on how to effectively utilize AVVISE for your
            grading needs.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Steps to Grade Using AVVISE
          </h2>
          <ul className="list-disc list-inside">
            <li className="text-lg mb-2">
              Enter the total number of questions
            </li>
            <li className="text-lg mb-2">
              Choose the appropriate marking system
            </li>
            <li className="text-lg mb-2">
              Enter the answer keys for each question
            </li>
            <li className="text-lg mb-2">
              Click on the Calculate Results button
            </li>
            <li className="text-lg mb-2">
              View the grading summary provided by AVVISE
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Additional Features</h2>
          <p className="text-lg mb-4">
            AVVISE also includes features for reviewing grading history,
            exporting results (coming soon), and customizing grading criteria to
            suit specific needs.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p className="text-lg mb-4">
            To begin using AVVISE, simply access the web application. {"There's"}
            no need for installation; you can start right away.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Support and Assistance
          </h2>
          <p className="text-lg mb-4">
            For any questions, troubleshooting, or feature requests, please
            contact our support team at{" "}
            <a
              className="text-blue-500"
              href="mailto:viralvaghela.dev@gmail.com"
            >
              viralvaghela.dev@gmail.com
            </a>
            . We are committed to providing timely assistance to ensure your
            experience with AVVISE is seamless.
          </p>
        </div>

        <div>
          <p className="text-lg mb-10">
            Thank you for choosing AVVISE for your grading needs. We hope this
            documentation helps you maximize the efficiency and accuracy of your
            grading process.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Docs;
