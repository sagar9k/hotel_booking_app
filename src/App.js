// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";
import PrivateRoute from "./components/PrivateRoute"; // Ensure this path is correct
import BookingCalendar from "./pages/BookingCalander";
import BookingList from "./pages/BookingList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NewBooking from "./pages/NewBooking";
import User from "./pages/User";
import AddUpdateRoom from "./components/AddUpdateRoom";
import Rooms from "./pages/Rooms";
import AddCustomer from "./components/AddCustomer";
import Customer from "./pages/Customer";
import AddUser from "./components/AddUser";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/booking-calendar"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <BookingCalendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking-list"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <BookingList />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-booking"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <NewBooking />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/rooms"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Rooms />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/rooms"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Rooms />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-users"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AddUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-rooms"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AddUpdateRoom />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-customers"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AddCustomer />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Customer />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </PersistGate>
  );
}

export default App;

