import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {
  const [users, setUsers] = useState([
    {
      userId: 0,
      userName: "",
      password: "",
      role: "",
    },
  ]);

  const [responseMessage, setResponseMessage] = useState("");
  const navigate= useNavigate();


  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedUsers = [...users];
    updatedUsers[index][name] = value;
    setUsers(updatedUsers);
  };

  const addUserRow = () => {
    setUsers([
      ...users,
      {
        userId: 0,
        userName: "",
        password: "",
        role: "",
      },
    ]);
  };

  const removeUserRow = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const customer of users) {
        console.log("Submitting customer data:", customer);

        const response = await axios.post(
          "https://freeapi.gerasim.in/api/HotelBooking/AddUpdateUser",
          customer,
          {
            headers: {
              "Content-Type": "application/json-patch+json",
            },
          }
        );

        if (response.status === 200) {
          setResponseMessage("User(s) successfully added/updated!");
          navigate("/user")
        } else {
          setResponseMessage("Failed to add/update the user(s).");
        }
      }
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      setResponseMessage(
        "An error occurred while adding/updating the user(s)."
      );
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">
          Add/Update Users
        </h1>
        <Link
          to={"/user"}
          className="px-3 py-2 rounded-md text-white bg-indigo-600"
        >
          Users
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">UserName</th>
              <th className="px-4 py-2 border-b">Password</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="userName"
                    value={user.userName}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    type="button"
                    onClick={() => removeUserRow(index)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={addUserRow}
          className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Customer
        </button>
        <button
          type="submit"
          className="mt-4 ml-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      {responseMessage && (
        <div className="mt-4 text-lg text-indigo-600 font-medium">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default AddUser;
