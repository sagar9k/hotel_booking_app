import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const NewBooking = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    aadharNo: "",
    city: "",
    address: "",
    bookingId: 0,
    roomId: 0,
    customerId: 0,
    bookingFromDate: "",
    bookingToDate: "",
    bookingRate: "",
    naration: "",
    createdBy: 0,
    hotelBookingDetails: [
      {
        bookingDetailId: 0,
        bookingId: 0,
        customerName: "",
        aadharCardNo: "",
      },
    ],
  });

  useEffect(() => {
    // Fetch users and rooms data on component mount
    axios
      .get("https://freeapi.gerasim.in/api/HotelBooking/GetAllUsers")
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get("https://freeapi.gerasim.in/api/HotelBooking/GetAllRooms")
      .then((response) => setRooms(response.data.data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHotelBookingDetailsChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.hotelBookingDetails];
    updatedDetails[index][name] = value;
    setFormData((prevState) => ({
      ...prevState,
      hotelBookingDetails: updatedDetails,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://freeapi.gerasim.in/api/HotelBooking/BookRoom", formData)
      .then((response) => {
        console.log("Booking added successfully:", response.data);
        navigate("/booking-list")
        
        // Reset form or handle success as needed
      })
      .catch((error) => console.error("Error adding booking:", error));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {/* Part 1: Customer Details */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border rounded p-2"
              />
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Mobile No"
                className="border rounded p-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border rounded p-2"
              />
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                placeholder="Aadhar No"
                className="border rounded p-2"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="border rounded p-2"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="border rounded p-2"
              />
            </div>
          </div>

          {/* Part 2: Hotel Booking Details */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Hotel Booking Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                className="border rounded p-2"
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room.roomId} value={room.roomId}>
                    {room.roomName} - {room.roomTariff}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="bookingRate"
                value={formData.bookingRate}
                onChange={handleChange}
                placeholder="Booking charges"
                className="border rounded p-2"
              />
              <input
                type="datetime-local"
                name="bookingFromDate"
                value={formData.bookingFromDate}
                onChange={handleChange}
                className="border rounded p-2"
              />
              <input
                type="datetime-local"
                name="bookingToDate"
                value={formData.bookingToDate}
                onChange={handleChange}
                className="border rounded p-2"
              />
              <textarea
                name="naration"
                value={formData.naration}
                onChange={handleChange}
                placeholder="Naration"
                className="border rounded p-2"
              />
              <select
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                className="border rounded p-2"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userName}
                  </option>
                ))}
              </select>
              {/* For hotel booking details, we can add a simple example */}
              {formData.hotelBookingDetails.map((detail, index) => (
                <div key={index} className="border p-2 rounded mb-2">
                  <input
                    type="text"
                    name="customerName"
                    value={detail.customerName}
                    onChange={(e) => handleHotelBookingDetailsChange(e, index)}
                    placeholder="Customer Name"
                    className="border rounded p-2 mb-2"
                  />
                  <input
                    type="text"
                    name="aadharCardNo"
                    value={detail.aadharCardNo}
                    onChange={(e) => handleHotelBookingDetailsChange(e, index)}
                    placeholder="Aadhar Card No"
                    className="border rounded p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewBooking;
