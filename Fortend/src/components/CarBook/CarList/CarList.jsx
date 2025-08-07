

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./CarList.css";

const CarList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const selectedLocation = queryParams.get("location");
  const selectedStartDate = queryParams.get("startDate");
  const selectedEndDate = queryParams.get("endDate");

  const [cars, setCars] = useState([]);
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateDays = () => {
    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate);
      const end = new Date(selectedEndDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  useEffect(() => {
    setDays(calculateDays());
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `http://localhost:5000/api/cars/location/${selectedLocation}`
        );
        
        console.log('API Response:', response.data);
        
        // Process image paths to ensure consistency
        const processedCars = response.data.map(car => ({
          ...car,
          image: car.image.replace(/^\/?uploads\//, '') // Remove any leading /uploads/
        }));
        
        setCars(processedCars);
      } catch (err) {
        console.error("API fetch error:", err);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedLocation) {
      fetchCars();
    }
  }, [selectedLocation]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="car-list-container1">
      <h1>Cars Available in {selectedLocation}</h1>
      
      <div className="booking-summary1">
        <p><strong>Dates:</strong> {selectedStartDate} to {selectedEndDate}</p>
        <p><strong>Duration:</strong> {days} day{days !== 1 ? "s" : ""}</p>
      </div>

      <div className="car-grid1">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className="car-card1">
              <div className="car-image-container1">
                <img 
                  src={`http://localhost:5000/uploads/${car.image}`}
                  alt={car.name}
                  className="car-image"
                  onError={(e) => {
                    console.error('Failed to load image:', e.target.src);
                    e.target.src = 'https://via.placeholder.com/300x200?text=Car+Image';
                    e.target.style.objectFit = 'contain';
                  }}
                />
              </div>
              <div className="car-info1">
                <h2>{car.name}</h2>
                <p><span>Seats:</span> {car.seats}</p>
                <p><span>Fuel:</span> {car.fuel}</p>
                <p><span>Transmission:</span> {car.transmission}</p>
                <p><span>Price:</span> ₹{car.price}/day</p>
                <p className="total-price">
                  <span>Total for {days} days:</span> ₹{car.price * days}
                </p>
              </div>
              <button 
                onClick={() => {
                  navigate(`/cars/${car._id}?location=${selectedLocation}&startDate=${selectedStartDate}&endDate=${selectedEndDate}`);
                }}
                className="view-details-btn"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="no-cars">
            <p>No cars available in {selectedLocation} for the selected dates.</p>
            <button onClick={() => navigate("/")} className="back-btn">
              Back to Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;



