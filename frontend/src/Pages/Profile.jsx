import { Navbar, Footer, CustomModal } from "../Components/compIndex";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { profileIconURL } from "../assets/URLs";
import { toast } from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/logout");
  };
  const user_id = localStorage.getItem("userId");
  const [userDetails, setUserDetail] = useState({
    fullName: "",
    email: "",
    avatarUrl: "",
  });
  const [newDetails, setNewDetail] = useState({
    newName: "",
    newEmail: "",
    newAvatar: "",
  });
  useEffect(() => {
    if (user_id) {
      const getAvatarUrl = async () => {
        const user_avatar_url = `http://localhost:4000/api/avatar/profile/${user_id}`;
        try {
          const avt_response = await fetch(user_avatar_url);
          if (!avt_response.ok) {
            throw new Error("Failed to fetch avatar URL");
          }
          const url_data = await avt_response.json();
          setUserDetail((prevDetails) => ({
            ...prevDetails,
            fullName: url_data.fullName,
            email: url_data.email,
            avatarUrl: url_data.avatarUrl,
          }));
        } catch (error) {
          console.log("Fetch Avatar Url error: ", error);
        }
      };
      getAvatarUrl();
    }
  }, [user_id, userDetails]);
  const handleChanges = (e) => {
    e.preventDefault();
    setNewDetail((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
    document.getElementById("saveChangeBtn").innerText = "Apply Changes";
  };
  const [Modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const handleAccountDelete = async () => {
    try {
      const delete_reponse = await fetch(
        `http://localhost:4000/api/user/delete/${user_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!delete_reponse.ok) {
        throw new Error("Failed to delete account");
      }
      toast.success("Account deleted successfully.");
      navigate("/logout");
    } catch (error) {
      console.error("Delete Account Error: ", error);
      toast.error("Failed to delete account. Please try again.");
    }
  };

  const token = localStorage.getItem("token");
  const updateAccountDetails = async (e) => {
    e.preventDefault();
    console.log("newName", newDetails.newName);
    try {
      const name_update_response = await fetch(
        `http://localhost:4000/api/user/update/${user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newName: newDetails.newName,
          }),
        }
      );
      console.log(newDetails);
      if (name_update_response.status === 200) {
        toast.success("Account updated successfully.");
        setUserDetail((prevDetails) => ({
          ...prevDetails,
          fullName: newDetails.newName,
        }));
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        throw new Error("Failed to update account");
      }
    } catch (error) {
      console.log("Account update error:", error);
      toast.error("Failed to update account. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-900">
              Your Account
            </h2>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm font-medium text-white bg-black rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              Logout
            </button>
          </div>
          <div className="flex items-center justify-center mb-8">
            <div className="relative rounded-full overflow-hidden w-40 h-40 bg-black">
              <img
                className="object-cover w-full h-full"
                src={userDetails.avatarUrl || localStorage.getItem("userImg")}
                alt="Profile"
              />
              <label
                htmlFor="profile-image"
                className="absolute z-10 bottom-0 right-0 bg-gray-700 text-white rounded-full cursor-pointer flex items-center justify-center w-10 h-10"
              >
                <svg
                  className="w-6 h-6 fill-current z-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 11V5h2v6h5v4h-1.99v1.99h-4v-4h-2v4h-4v-1.99h-4v-4h5v-6h2v6z" />
                </svg>
                <input
                  onChange={handleChanges}
                  id="profile-image"
                  type="file"
                  className="hidden z-10"
                />
              </label>
            </div>
          </div>
          <form onSubmit={updateAccountDetails} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="username"
                onChange={handleChanges}
                name="newName"
                type="text"
                className="mt-1 h-10  block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                defaultValue={userDetails.fullName}
              />
              <p className="mt-2 text-sm text-gray-500">
                Choose a unique username that represents you.
              </p>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                onChange={handleChanges}
                name="newEmail"
                type="email"
                className="mt-1 h-10  block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                defaultValue={userDetails.email}
              />
              <p className="mt-2 text-sm text-gray-500">
                Update your email address for account notifications.
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                onChange={handleChanges}
                type="password"
                className="mt-1 h-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
              <p className="mt-2 text-sm text-gray-500">
                Set a strong password to protect your account.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <button
                onClick={updateAccountDetails}
                id="saveChangeBtn"
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Save Changes
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            <p>
              By saving changes, you agree to our{" "}
              <a href="#" className="text-gray-900 font-medium hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-900 font-medium hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <div className="mt-10 mb-10">
              <div className="bg-red-400 w-auto h-2 mb-5"></div>
              <h6 className="mb-7 text-sm"> ⚠️ Danger Zone</h6>
              <button
                onClick={openModal}
                className="px-3 py-1 text-sm font-medium text-white bg-black rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-700"
              >
                Delete Account
              </button>
            </div>
            <p className="mt-2">
              Need help?{" "}
              <a href="#" className="text-gray-900 font-medium hover:underline">
                Contact Support
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      {Modal && (
        <>
          <CustomModal
            message={
              "Are you sure you want to delete your account? This action cannot be undone."
            }
            cancel={closeModal}
            cancelMsg={"Go Back"}
            action={handleAccountDelete}
            bgColor={"bg-black"}
            actionMsg={"Delete Account"}
          />
        </>
      )}
      <Footer />
    </>
  );
};

export default Profile;
