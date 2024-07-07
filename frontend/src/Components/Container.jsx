import { Link } from "react-router-dom";
const Container = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <header className="bg-white py-20 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 ">
            <div className="text-center">
              <div className="text-7 bg-clip-text cursor-default text-7xl text-transparent bg-gradient-to-r from-black to-white font-bold dark:text-white hover:from-white hover:to-black">
                <svg className="homeSvg" viewBox="0 0 1320 300">
                  <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                    AVVISE
                  </text>
                </svg>
              </div>
              <h1 className="text-3xl mt-7 mb-10 font-semibold">
                Introducing the Ultimate WebApp Calculator.
              </h1>
              <p className="mt-4 text-lg text-gray-700 dark:text-white">
                Streamline your grading process with our intuitive MCQ
                evaluation tool.
              </p>
              <div className="mt-6 dark:animate-none">
                <Link to="/calculator">
                  <div className="bg-black hover:opacity-80 text-white px-6 py-3 inline-block dark:bg-purple-600 rounded-2xl">
                    Get Started
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-20 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                  Efficient Grading
                </h2>
                <p className="text-lg text-gray-700 dark:text-white">
                  Save time and effort with automated grading features.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                  User-Friendly Interface
                </h2>
                <p className="text-lg text-gray-700 dark:text-white">
                  Intuitive design for easy navigation and management of MCQ
                  evaluations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-black">
              Ready to Revolutionize Your Grading?
            </h2>
            <p className="mt-4 text-lg text-black">
              Sign up today and experience the power of our MCQ grading
              solution.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="bg-black text-white hover:opacity-80 px-6 py-3 font-medium inline-block dark:bg-purple-600 dark:text-white rounded-2xl"
              >
                Sign Up Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Container;
