import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../app/features/authSlice";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Booking Calendar", href: "/booking-calendar" },
  { name: "Booking List", href: "/booking-list" },
  { name: "New Booking", href: "/new-booking" },
  { name: "Rooms", href: "/rooms" },
  { name: "User", href: "/user" },
  { name: "Customer", href: "/customers" },
];

const colors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-orange-600",
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const getFirstLetter = (userName) => {
  return userName ? userName.charAt(0).toUpperCase() : "";
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user?.userName);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 uppercase">
      <div className="w-full container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">Hotel Booking App</div>
        <div className="flex  space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                location.pathname === item.href
                  ? "bg-indigo-500 text-white"
                  : "hover:bg-indigo-500 text-gray-200"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800"
              >
                Logout
              </button>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${getRandomColor()}`}
              >
                {getFirstLetter(userName)}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:bg-indigo-500 rounded-md px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
