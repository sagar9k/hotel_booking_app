import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          "https://freeapi.gerasim.in/api/HotelBooking/GetAllUsers"
        );
        if (response.data.result) {
          setUsers(response.data.data);
        } else {
          setError("Failed to fetch customer data");
        }
      } catch (error) {
        setError("An error occurred while fetching customer data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedUser({ ...users[index] });
  };

  const handleCancelClick = () => {
    setEditIndex(-1);
    setEditedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async (custId) => {
    try {
      const response = await axios.post(
        "https://freeapi.gerasim.in/api/HotelBooking/AddUpdateUser",
        editedUser,
        {
          headers: {
            "Content-Type": "application/json-patch+json",
          },
        }
      );
      if (response.status === 200) {
        const updatedUsers = [...users];
        updatedUsers[editIndex] = editedUser;
        setUsers(updatedUsers);
        setEditIndex(-1);
        setEditedUser(null);
      } else {
        alert("Failed to update customer.");
      }
    } catch (error) {
      alert("An error occurred while updating the customer.");
    }
  };

  const handleDeleteClick = async (custId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await axios.delete(
          `https://freeapi.gerasim.in/api/HotelBooking/DeleteUserByUserId?custId=${custId}`
        );
        if (response.status === 200) {
          setUsers(users.filter((customer) => customer.custId !== custId));
        } else {
          alert("Failed to delete customer.");
        }
      } catch (error) {
        alert("An error occurred while deleting the customer.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
            Customer Details
          </h1>
          <Link
            to={"/add-users"}
            className="px-3 py-2 rounded-md text-white bg-indigo-600"
          >
            New User
          </Link>
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  User Id
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Password
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user, index) => (
                <tr
                  key={user.custId}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-100 transition duration-150 ease-in-out`}
                >
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="userName"
                        value={editedUser.userName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      user.userName
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {editIndex === index ? (
                      <input
                        type="password"
                        name="password"
                        value={editedUser.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      user.password
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {editIndex === index ? (
                      <input
                        type="text"
                        name="role"
                        value={editedUser.role}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      user.role
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {editIndex === index ? (
                      <>
                        <button
                          className="text-green-600 hover:text-green-800 mr-2"
                          onClick={() => handleSaveClick(user.userId)}
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={handleCancelClick}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-indigo-600 hover:text-indigo-800 mr-2"
                          onClick={() => handleEditClick(index)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteClick(user.userId)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default User;
