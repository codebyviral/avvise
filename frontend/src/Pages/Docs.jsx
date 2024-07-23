import { Navbar, Footer } from "../Components/compIndex";
const Docs = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">AVVISE Documentation</h1>

        <div className="flex flex-col lg:flex-row">
          {/* Table of Contents */}
          <div className="lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
            <h2 className="text-2xl font-semibold mb-2">Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Introduction
                <ul className="list-disc list-inside ml-6">
                  <li>What is AVVISE?</li>
                  <li>Purpose of This Documentation</li>
                </ul>
              </li>
              <li>
                Getting Started
                <ul className="list-disc list-inside ml-6">
                  <li>Accessing AVVISE</li>
                  <li>System Requirements</li>
                </ul>
              </li>
              <li>
                Steps to Grade Using AVVISE
                <ul className="list-disc list-inside ml-6">
                  <li>Enter the Total Number of Questions</li>
                  <li>Choose the Appropriate Marking System</li>
                  <li>Enter the Answer Keys for Each Question</li>
                  <li>Calculate Results</li>
                  <li>Viewing the Grading Summary</li>
                </ul>
              </li>
              <li>
                Additional Features
                <ul className="list-disc list-inside ml-6">
                  <li>Reviewing Grading History</li>
                  <li>Exporting Results (Coming Soon)</li>
                  <li>Customizing Grading Criteria</li>
                </ul>
              </li>
              <li>Support and Assistance</li>
              <li>Conclusion</li>
            </ol>
          </div>

          {/* Vertical Line Bar for Larger Devices */}
          <div className="hidden lg:block lg:w-px bg-gray-300 mx-4"></div>

          <hr className="mb-5 w-auto sm:block lg:hidden" />

          {/* Documentation Sections */}
          <div className="lg:w-3/4">
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>

              <h3 className="text-2xl font-semibold mb-2">
                1.1 What is AVVISE?
              </h3>
              <p className="text-lg mb-4">
                AVVISE is a tool that makes grading easy for students,teachers
                and educators. It helps you grade assessments, exams, and
                quizzes without much hassle.
              </p>

              <h3 className="text-2xl font-semibold mb-2">
                1.2 Purpose of This Documentation
              </h3>
              <p className="text-lg mb-4">
                This document is here to guide you on how to use AVVISE
                effectively for your grading tasks.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-4">2. Getting Started</h2>

              <h3 className="text-2xl font-semibold mb-2">
                2.1 Accessing AVVISE
              </h3>
              <p className="text-lg mb-4">
                To start using AVVISE, simply open a web browser and go to the
                AVVISE website. There is no need to install anything; you can
                begin right away.
              </p>

              <h3 className="text-2xl font-semibold mb-2">
                2.2 System Requirements
              </h3>
              <p className="text-lg mb-4">
                You only need an internet connection and a web browser to use
                AVVISE. It works on most current browsers, making it easy for
                everyone to access.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                3. Steps to Grade Using AVVISE
              </h2>

              <h3 className="text-2xl font-semibold mb-2">
                3.1 Enter the Total Number of Questions
              </h3>
              <p className="text-lg mb-4">
                First, you need to input the total number of questions in the
                assessment you want to grade.
              </p>

              <h3 className="text-2xl font-semibold mb-2">
                3.2 Choose the Appropriate Marking System
              </h3>
              <p className="text-lg mb-4">
                Next, select the marking system that fits your needs. AVVISE
                offers various options for different types of assessments.
              </p>

              <h3 className="text-2xl font-semibold mb-2">
                3.3 Enter the Answer Keys for Each Question
              </h3>
              <p className="text-lg mb-4">
                Then, input the answer keys for each question. This step is
                crucial because it allows AVVISE to compare student answers
                against the correct ones.
              </p>

              <h3 className="text-2xl font-semibold mb-2">
                3.4 Calculate Results
              </h3>
              <p className="text-lg mb-4">
                After entering the answer keys, click on the "Calculate Results"
                button. AVVISE will then process the information you provided.
              </p>

              <h3 className="text-2xl font-semibold mb-2">
                3.5 Viewing the Grading Summary
              </h3>
              <p className="text-lg mb-4">
                Once the results are calculated, you will see a grading summary.
                This summary will show how many questions were correct and the
                overall score.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                4. Additional Features
              </h2>

              <h3 className="text-2xl font-semibold mb-2">
                4.1 Reviewing Grading History
              </h3>
              <p className="text-lg mb-4">
                AVVISE allows you to review past grading history. This feature
                helps you keep track of previous assessments easily.
              </p>

              <h3 className="text-2xl font-semibold mb-2">
                4.2 Exporting Results (Coming Soon)
              </h3>
              <p className="text-lg mb-4">
                AVVISE will soon have a feature to export results. This will
                help you save or share grading results more conveniently.
              </p>

              <h3 className="text-2xl font-semibold mb-2">
                4.3 Customizing Grading Criteria
              </h3>
              <p className="text-lg mb-4">
                You can also customize grading criteria according to your
                specific needs. This flexibility makes AVVISE useful for
                different teaching styles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                5. Support and Assistance
              </h2>
              <p className="text-lg mb-4">
                If you have any questions or face any issues while using AVVISE,
                feel free to reach out to our support team at{" "}
                <a
                  href="mailto:viralvaghela.dev@gmail.com"
                  className="text-blue-500"
                >
                  viralvaghela.dev@gmail.com
                </a>
                . We are here to help and ensure you have a smooth experience
                with AVVISE.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">6. Conclusion</h2>
              <p className="text-lg mb-4">
                Thank you for choosing AVVISE for your grading needs. We hope
                this documentation has helped you understand how to use AVVISE
                efficiently. Enjoy smoother grading with AVVISE!
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Docs;
