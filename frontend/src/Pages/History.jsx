import { useEffect, useState } from "react";
import { Navbar, Footer } from "../Components/compIndex";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const History = () => {
  const navigate = useNavigate();
  const { historyId, setHistoryId } = useAppContext();
  const [newUser, setNewUser] = useState(true);
  const [history, setHistory] = useState(["testArray"]);
  useEffect(() => {
    const storedHistory = JSON.parse(
      window.localStorage.getItem("calculatedHistory")
    );
    if (storedHistory && storedHistory.length > 0) {
      setNewUser(false);
      setHistory(storedHistory);
    }
  }, []);
  const handleHistory = (itemId) => {
    setHistoryId(itemId);
    setTimeout(() => {
      navigate("/projects");
    }, 1000);
  };
  useEffect(() => {
    console.log("historyId updated:", historyId);
  }, [historyId]);
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {newUser ? (
          <div className="flex justify-center items-center mt-4">
            <h2 className="text-center mt-72 lg:text-xl">
              No records available. Please use the calculator to generate your
              history.
            </h2>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
              OMR Result History
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  id={`historyID-${item.id}`}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold">
                    Calculated on - {new Date(item.timeStamp).toLocaleString()}
                  </h3>
                  <p className="font-semibold">
                    Total Marks: {item.totalMarks}
                  </p>
                  <p className="font-semibold">
                    Total Correct: &nbsp;
                    <span className="text-green-500">{item.totalCorrect}</span>
                  </p>
                  <p className="font-semibold">
                    Total Incorrect: &nbsp;
                    <span className="text-red-500">{item.totalIncorrect}</span>
                  </p>
                  <p className="font-semibold">
                    Total Unattempted: &nbsp;
                    <span className="text-yellow-500">
                      {item.totalUnattempted}
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      handleHistory(item.id);
                    }}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    View OMR Sheet
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default History;
