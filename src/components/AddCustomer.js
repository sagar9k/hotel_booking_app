import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [customers, setCustomers] = useState([
    {
      custId: 0,
      name: "",
      mobileNo: "",
      email: "",
      aadharNo: "",
      city: "",
      address: "",
    },
  ]);

  const [responseMessage, setResponseMessage] = useState("");
  const navigate= useNavigate();


  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCustomers = [...customers];
    updatedCustomers[index][name] = value;
    setCustomers(updatedCustomers);
  };

  const addCustomerRow = () => {
    setCustomers([
      ...customers,
      {
        custId: 0,
        name: "",
        mobileNo: "",
        email: "",
        aadharNo: "",
        city: "",
        address: "",
      },
    ]);
  };

  const removeCustomerRow = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const customer of customers) {
        console.log("Submitting customer data:", customer);

        const response = await axios.post(
          "https://freeapi.gerasim.in/api/HotelBooking/AddUpdateCustomer",
          customer,
          {
            headers: {
              "Content-Type": "application/json-patch+json",
            },
          }
        );

        if (response.status === 200) {
          setResponseMessage("Customer(s) successfully added/updated!");
          navigate("/customers")
        } else {
          setResponseMessage("Failed to add/update the customer(s).");
        }
      }
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      setResponseMessage(
        "An error occurred while adding/updating the customer(s)."
      );
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">
          Add/Update Customers
        </h1>
        <Link
          to={"/customers"}
          className="px-3 py-2 rounded-md text-white bg-indigo-600"
        >
          Customers
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Mobile No</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Aadhar No</th>
              <th className="px-4 py-2 border-b">City</th>
              <th className="px-4 py-2 border-b">Address</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="mobileNo"
                    value={customer.mobileNo}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="aadharNo"
                    value={customer.aadharNo}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="city"
                    value={customer.city}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    name="address"
                    value={customer.address}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    type="button"
                    onClick={() => removeCustomerRow(index)}
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
          onClick={addCustomerRow}
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

export default AddCustomer;
