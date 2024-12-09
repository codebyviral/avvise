import { useEffect, useState } from "react";
import { Navbar, Footer, CustomModal } from "../Components/compIndex";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import uploadLogo from "../assets/cloud-upload.png";

const History = () => {
  const navigate = useNavigate();
  const { setHistoryId } = useAppContext();
  const [loading, setLoading] = useState({});
  const [newUser, setNewUser] = useState(true);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
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
      setLoading((prevState) => ({ ...prevState, [itemId]: false }));
      navigate("/projects");
    }, 500);
  };

  const handleEditHistory = (itemId) => {
    setHistoryId(itemId);
    toast.success(
      `This feature is launching soon. Thank you for your patience!`
    );

    // navigate("/calculator");
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

  const confirmDeleteAll = () => {
    setHistory([]);
    setNewUser(true);
    window.localStorage.removeItem("calculatedHistory");
    setIsDeleteAllModalOpen(false);
    location.reload();
  };

  const deleteAll = () => {
    setIsDeleteAllModalOpen(true);
  };

  const openModal = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const closeDeleteAllModal = () => {
    setIsDeleteAllModalOpen(false);
  };

  const user_id = localStorage.getItem("userId");

  const uploadAll = async () => {
    const postUrl = `https://avvise-backend.vercel.app/api/user/upload/omr/${user_id}`;

    try {
      await axios.post(
        postUrl,
        {
          omrData: history,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("All your history has been uploaded to the cloud!");
    } catch (error) {
      console.error("Error uploading data:", error);
      toast.error("Failed to upload data. Are you Logged In?");
    }
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
                      className="mt-2 w-44 flex justify-center bg-black text-white px-4 py-2 rounded-lg hover:opacity-80"
                    >
                      {loading[item.id] ? (
                        <>
                          <Oval
                            color="#fff"
                            height={20} // Set loader height
                            width={20} // Set loader width
                            secondaryColor="#fff"
                          />{" "}
                          &nbsp; Almost done...
                        </>
                      ) : (
                        "View OMR Sheet"
                      )}
                    </button>
                    <div className="ml-auto mt-4 flex">
                      <button
                        onClick={() => handleEditHistory(item.id)}
                        className="flex justify-center hover:opacity-80 mr-3"
                      >
                        <img
                          className="w-7"
                          src="https://img.icons8.com/?size=512&id=86374&format=png"
                          alt="Delete"
                        />
                      </button>
                      <button
                        onClick={() => openModal(item.id)}
                        className="flex justify-center hover:opacity-80"
                      >
                        <img
                          className="w-7"
                          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/delete-52-103683.png?f=webp&w=512"
                          alt="Delete"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center mt-6 space-y-4">
              <button
                onClick={uploadAll}
                className="bg-stone-200 text-black px-4 py-2 rounded-lg hover:opacity-80"
              >
                Save All History
                <img className="w-7 ml-2 mb-1" src={uploadLogo} alt="" />
              </button>
              <button
                onClick={deleteAll}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:opacity-80"
              >
                Delete All Items
              </button>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <CustomModal
          message={"Are you sure you want to delete this item?"}
          cancelMsg={"Cancel"}
          actionMsg={"Delete"}
          bgColor={"bg-red-600"}
          cancel={closeModal}
          action={deleteHistoryItem}
        />
      )}
      {isDeleteAllModalOpen && (
        <CustomModal
          message={
            "Save history to Account. If you want. Are you sure you want to delete all history items?"
          }
          cancelMsg={"Cancel"}
          actionMsg={"Delete All"}
          bgColor={"bg-red-600"}
          cancel={closeDeleteAllModal}
          action={confirmDeleteAll}
        />
      )}
      <Footer />
    </>
  );
};

export default History;
