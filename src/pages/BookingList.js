import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://freeapi.gerasim.in/api/HotelBooking/GetAllBookings"
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(
        `https://freeapi.gerasim.in/api/HotelBooking/CancelBookingByBookingId`,
        { data: { bookingId } }
      );
      setBookings(
        bookings.filter((booking) => booking.bookingId !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Booking List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Booking ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  User Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Mobile No
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Passenger Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Booking From
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Booking To
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Rate
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Naration
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {booking.bookingId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {booking.userName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {booking.mobileNo}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {booking.passengerName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {new Date(booking.bookingFromDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {new Date(booking.bookingToDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {booking.bookingRate}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {booking.naration}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <button
                      onClick={() => handleDelete(booking.bookingId)}
                      className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
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
    </>
  );
};

export default BookingList;
