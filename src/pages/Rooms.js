import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewBooking from "./NewBooking";
import {
  faEdit,
  faTrashAlt,
  faUserFriends,
  faCheckCircle,
  faTimesCircle,
  faMoneyBillWave,
  faSnowflake,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editedRoom, setEditedRoom] = useState({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://freeapi.gerasim.in/api/HotelBooking/GetAllRooms"
        );
        if (response.data.result) {
          setRooms(response.data.data);
        } else {
          setError("Failed to fetch rooms data");
        }
      } catch (error) {
        setError("An error occurred while fetching rooms data");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleEdit = (room) => {
    setEditingRoomId(room.roomId);
    setEditedRoom(room);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedRoom({
      ...editedRoom,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (roomId) => {
    try {
      await axios.post(
        "https://freeapi.gerasim.in/api/HotelBooking/AddUpdateBulkRooms",
        [editedRoom],
        {
          headers: {
            "Content-Type": "application/json-patch+json",
          },
        }
      );
      setRooms(
        rooms.map((room) => (room.roomId === roomId ? editedRoom : room))
      );
      setEditingRoomId(null);
    } catch (error) {
      console.error("Failed to save room changes", error);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(
        `https://freeapi.gerasim.in/api/HotelBooking/DeleteRoomByRoomId?roomId=${roomId}`
      );
      setRooms(rooms.filter((room) => room.roomId !== roomId));
    } catch (error) {
      console.error("Failed to delete room", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-indigo-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-indigo-100">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-thin uppercase text-center text-indigo-600 mb-12">
            Room Details
          </h1>
          <Link
            to={"/add-rooms"}
            className="px-3 py-2 rounded-md text-white bg-indigo-600"
          >
            Add Rooms
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className={`relative p-6 rounded-lg shadow-lg border border-gray-200 bg-gray-50 hover:shadow-2xl hover:border-indigo-400 transition-shadow duration-300`}
            >
              {editingRoomId === room.roomId ? (
                <>
                  <input
                    type="text"
                    name="roomName"
                    value={editedRoom.roomName}
                    onChange={handleChange}
                    className="text-2xl font-semibold text-gray-800 mb-4"
                  />
                  <input
                    type="number"
                    name="roomCapacity"
                    value={editedRoom.roomCapacity}
                    onChange={handleChange}
                    className="text-lg text-gray-600 mb-2"
                  />
                  <input
                    type="number"
                    name="roomTariff"
                    value={editedRoom.roomTariff}
                    onChange={handleChange}
                    className="text-lg text-gray-600 mb-2"
                  />
                  <input
                    type="text"
                    name="extensionNo"
                    value={editedRoom.extensionNo}
                    onChange={handleChange}
                    className="text-lg text-gray-600"
                  />
                  <div className="text-lg mb-2">
                    <label>
                      <input
                        type="checkbox"
                        name="isAcAvailable"
                        checked={editedRoom.isAcAvailable}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      AC Available
                    </label>
                  </div>
                  <div className="text-lg mb-2">
                    <label>
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={editedRoom.isActive}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Active
                    </label>
                  </div>
                  <button
                    onClick={() => handleSave(room.roomId)}
                    className="mt-4 px-3 py-2 bg-green-600 text-white rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingRoomId(null)}
                    className="mt-4 ml-2 px-3 py-2 bg-red-600 text-white rounded-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {room.roomName}
                  </h2>
                  <p className="text-lg text-gray-600 mb-2">
                    <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                    <span className="font-semibold">Capacity:</span>{" "}
                    {room.roomCapacity} Persons
                  </p>
                  <p
                    className={`text-lg mb-2 ${
                      room.isActive ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={room.isActive ? faCheckCircle : faTimesCircle}
                      className="mr-2"
                    />
                    <span className="font-semibold">Status:</span>{" "}
                    {room.isActive ? "Active" : "Inactive"}
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
                    <span className="font-semibold">Tariff:</span> ₹
                    {room.roomTariff} / night
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    <FontAwesomeIcon icon={faSnowflake} className="mr-2" />
                    <span className="font-semibold">AC:</span>{" "}
                    {room.isAcAvailable ? "Yes" : "No"}
                  </p>
                  <p className="text-lg text-gray-600">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    <span className="font-semibold">Extension No:</span>{" "}
                    {room.extensionNo}
                  </p>
                  <div className="flex ">
                    <button
                      onClick={() => handleEdit(room)}
                      className="mt-4 px-3 py-2 bg-indigo-600 text-white rounded-md flex items-center"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.roomId)}
                      className="mt-4 ml-3 px-3 py-2 bg-red-600 text-white rounded-md flex items-center"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
