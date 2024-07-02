import { useState } from "react";
import { Navbar, Footer } from "../Components/compIndex";
import { useAppContext } from "../context/AppContext";
const History = () => {
  const { historyId, setHistoryId } = useAppContext();
  const history = JSON.parse(window.localStorage.getItem("calculatedHistory"));
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
            OMR Result History
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {history.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold">
                  Calculated on - {new Date(item.timeStamp).toLocaleString()}
                </h3>
                <p className="font-semibold">Total Marks: {item.totalMarks}</p>
                <p className="font-semibold">
                  Total Correct:{" "}
                  <span className="text-green-500">{item.totalMarks}</span>
                </p>
                <p className="font-semibold">
                  Total Incorrect:{" "}
                  <span className="text-red-500">{item.totalIncorrect}</span>
                </p>
                <p className="font-semibold">
                  Total Unattempted:{" "}
                  <span className="text-yellow-500">
                    {item.totalUnattempted}
                  </span>
                </p>
                <button
                  onClick={() => {
                    setHistoryId(item.id);
                    console.log("historyId is", historyId);
                  }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View OMR Sheet
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default History;
