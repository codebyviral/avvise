import { useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../Components/compIndex";
const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Coming Soon!
          </h1>
          <p className="text-center text-gray-600 mb-6">
            We are working hard to bring you something amazing.
          </p>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 flex items-center justify-center text-white text-2xl">
              🚀
            </div>
          </div>
          <p className="text-center text-gray-600 mb-4">
            Stay tuned for updates.
          </p>
          <div className="flex flex-row justify-center">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="bg-black hover:opacity-80 text-white py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
            >
              Return Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComingSoon;
