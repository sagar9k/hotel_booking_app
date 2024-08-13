import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddUpdateRooms = () => {
  const [rooms, setRooms] = useState([
    {
      roomId: 0,
      roomName: "",
      isAcAvailable: true,
      roomCapacity: 0,
      isActive: true,
      roomTariff: 0,
      extensionNo: "",
    },
  ]);

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedRooms = [...rooms];
    updatedRooms[index][name] = type === "checkbox" ? checked : value;
    setRooms(updatedRooms);
  };

  const addRoomRow = () => {
    setRooms([
      ...rooms,
      {
        roomId: 0,
        roomName: "",
        isAcAvailable: true,
        roomCapacity: 0,
        isActive: true,
        roomTariff: 0,
        extensionNo: "",
      },
    ]);
  };

  const removeRoomRow = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://freeapi.gerasim.in/api/HotelBooking/AddUpdateBulkRooms",
        rooms,
        {
          headers: {
            "Content-Type": "application/json-patch+json",
          },
        }
      );
      if (response.status === 200) {
        setResponseMessage("Rooms successfully added/updated!");
      } else {
        setResponseMessage("Failed to add/update the rooms.");
      }
    } catch (error) {
      setResponseMessage("An error occurred while adding/updating the rooms.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Add Rooms</h1>
        <Link
          to={"/rooms"}
          className="px-3 py-2 rounded-md text-white bg-indigo-600"
        >
          Rooms
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Room Name</th>
              <th className="px-4 py-2 border-b">Room Capacity</th>
              <th className="px-4 py-2 border-b">Room Tariff</th>
              <th className="px-4 py-2 border-b">Extension No</th>
              <th className="px-4 py-2 border-b">AC Available</th>
              <th className="px-4 py-2 border-b">Active</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="roomName"
                    value={room.roomName}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="number"
                    name="roomCapacity"
                    value={room.roomCapacity}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="number"
                    name="roomTariff"
                    value={room.roomTariff}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="extensionNo"
                    value={room.extensionNo}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <input
                    type="checkbox"
                    name="isAcAvailable"
                    checked={room.isAcAvailable}
                    onChange={(e) => handleChange(index, e)}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={room.isActive}
                    onChange={(e) => handleChange(index, e)}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    type="button"
                    onClick={() => removeRoomRow(index)}
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
          onClick={addRoomRow}
          className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Room
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

export default AddUpdateRooms;
