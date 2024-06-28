import { Link } from "react-router-dom";
const Container = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <header className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl mt-20 font-bold text-gray-900">
                Welcome to our Grading MCQ Web App
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Streamline your grading process with our intuitive MCQ
                evaluation tool.
              </p>
              <div className="mt-6 animate-bounce">
                <Link to="/calculator">
                  <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block">
                    Get Started
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Efficient Grading
                </h2>
                <p className="text-lg text-gray-700">
                  Save time and effort with automated grading features.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  User-Friendly Interface
                </h2>
                <p className="text-lg text-gray-700">
                  Intuitive design for easy navigation and management of MCQ
                  evaluations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-500 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Revolutionize Your Grading?
            </h2>
            <p className="mt-4 text-lg text-white">
              Sign up today and experience the power of our MCQ grading
              solution.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="bg-white text-blue-500 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium inline-block"
              >
                Sign Up Now
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Container;
