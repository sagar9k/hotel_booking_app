import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faKey } from "@fortawesome/free-solid-svg-icons";

const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `https://freeapi.gerasim.in/api/HotelBooking/GetBookingsByMonth?month=${month}`
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://freeapi.gerasim.in/api/HotelBooking/GetAllRooms"
        );
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchBookings();
    fetchRooms();
  }, [month]);

  const daysInMonth = new Date(year, month, 0).getDate();

  const handlePreviousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const isBooked = (day, roomName) => {
    return bookings.some((b) => b.monthDay === day && b.roomName === roomName);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6"> 
          <button
            onClick={handlePreviousMonth}
            className="px-4 py-2 bg-gray-300 rounded-md text-indigo-600"
          >
            Previous
          </button>
          <h2 className="text-2xl font-bold text-center text-indigo-600">
            {`${new Date(year, month - 1).toLocaleString("default", {
              month: "long",
            })} ${year}`}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 bg-gray-300 rounded-md text-indigo-600"
          >
            Next
          </button>
        </div>
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
          <table className="min-w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Room
                </th>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <th
                    key={i}
                    className="border border-gray-200 px-2 py-1 text-center"
                  >
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.roomId} className="border-b hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">
                    {room.roomName}
                  </td>
                  {Array.from({ length: daysInMonth }, (_, i) => (
                    <td
                      key={i}
                      className="border border-gray-200 text-center py-2"
                    >
                      <FontAwesomeIcon
                        icon={isBooked(i + 1, room.roomName) ? faBed : faKey}
                        className={`${
                          isBooked(i + 1, room.roomName)
                            ? "text-green-600"
                            : "text-gray-300"
                        } text-xl`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingCalendar;
