import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch car listings from localStorage or a backend API
    const storedCars = JSON.parse(localStorage.getItem("cars")) || [];
    setCars(storedCars);

    // Fetch bookings from localStorage or a backend API
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter(car => car.id !== id);
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  };

  const handleDeleteBooking = (id) => {
    const updatedBookings = bookings.filter(booking => booking.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="car-listing">
        <h2>Manage Cars</h2>
        <table className="car-table">
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Model</th>
              <th>Price Per Day</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.name}</td>
                <td>{car.model}</td>
                <td>{car.price}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteCar(car.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="booking-listing">
        <h2>Manage Bookings</h2>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Car</th>
              <th>Days</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userDetails.name}</td>
                <td>{booking.carName}</td>
                <td>{booking.days}</td>
                <td>{booking.totalPrice}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteBooking(booking.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
