import { Link } from "react-router-dom";
import { Navbar } from "../Components/compIndex.js";
const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page {"you're"} looking for {"doesn't"} exist.
          </p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
