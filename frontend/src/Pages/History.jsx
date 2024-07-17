import { useEffect, useState } from "react";
import { Navbar, Footer } from "../Components/compIndex";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const History = () => {
  const navigate = useNavigate();
  const { historyId, setHistoryId } = useAppContext();
  const [loading, setLoading] = useState({});
  const [newUser, setNewUser] = useState(true);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
    setLoading((prevState) => ({ ...prevState, [itemId]: true }));
    setHistoryId(itemId);
    setTimeout(() => {
      setLoading(false);
      setLoading((prevState) => ({ ...prevState, [itemId]: true }));
      navigate("/projects");
    }, 500);
  };

  const deleteHistoryItem = () => {
    const updatedHistory = history.filter((item) => item.id !== selectedItemId);
    setHistory(updatedHistory);
    window.localStorage.setItem(
      "calculatedHistory",
      JSON.stringify(updatedHistory)
    );
    setIsModalOpen(false);
    setSelectedItemId(null);
    location.reload();
  };

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

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
                    Total Questions: {item.maxQuestions}
                  </p>
                  <p className="font-semibold">
                    Total Marks: {item.totalMarks && item.totalMarks.toFixed(2)}{" "}
                    / {item.maxMarks}
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
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleHistory(item.id)}
                      className="mt-2 w-44 flex justify-center bg-black text-white px-4 py-2 rounded-2xl hover:opacity-80"
                    >
                      {loading[item.id] ? (
                        <>
                          <Oval color="#fff" height={20} width={20} /> &nbsp;
                          Almost done...
                        </>
                      ) : (
                        "View OMR Sheet"
                      )}
                    </button>
                    <div className="ml-auto mt-4">
                      <button
                        onClick={() => openModal(item.id)}
                        className="flex justify-center hover:opacity-80"
                      >
                        <img
                          className="w-7"
                          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-52-103683.png?f=webp&w=512"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteHistoryItem}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default History;
