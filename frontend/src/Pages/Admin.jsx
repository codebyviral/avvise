import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/compIndex";
import { useAuthContext } from "../context/AuthContext";
const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const fetchUsers = async () => {
    const usersUrlAdmin = "https://avvise-backend.vercel.app/api/users/admin";
    try {
      const response = await fetch(usersUrlAdmin, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setUsers(data);
      setIsAdmin(localStorage.getItem("isAdmin"));
    } catch (error) {
      console.log("users api fetch error", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const handleDelete = (id) => {
    console.log(`User with id ${id} deleted`);
    // Add your delete logic here
  };

  const handleEmail = (email) => {
    console.log(`Email sent to ${email}`);
  };
  return (
    <>
      <Navbar />
      {isAdmin ? (
        <>
          {" "}
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-600 text-white p-4">
              <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-200">
                    Dashboard
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-200">
                    Users
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-200">
                    Settings
                  </a>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <h1 className="text-3xl font-bold mb-6">User Management</h1>
              <div className="bg-white shadow-md rounded p-4">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-2 text-left">Name</th>
                      <th className="py-2 text-left">Email</th>
                      <th className="py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-t">
                        <td className="py-2">{user.fullName}</td>{" "}
                        {/* Updated to use fullName */}
                        <td className="py-2">{user.email}</td>
                        <td className="py-2 text-right">
                          <button
                            onClick={() => handleEmail(user.email)}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                          >
                            Email
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white border border-red-500 rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-red-500 mb-4">
                Admin Access Required
              </h1>
              <p className="text-gray-700 mb-6">
                It seems you do not have the necessary permissions to access
                this page. Please contact your administrator for further
                assistance.
              </p>
              <a
                href="/"
                className="text-white bg-black hover:bg-opacity-80 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Go to Home
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
