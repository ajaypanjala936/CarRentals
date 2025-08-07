import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tesla from "./images/Tesla-Model-3-No-Background.png";
import toyota from "./images/camry_010_s.jpg";
import hyundai from "./images/hyundai certa.jpg";
import thar from "./images/thar.webp1.png";
import swift from "./images/swift.webp";
import './CarD.css';

const carData = [
  { id: 1, name: "Tesla Model 3", image: tesla, price: 5000, seats: 5, fuel: "Electric", location: "Hyderabad" },
  { id: 2, name: "Toyota Camry", image: toyota, price: 3000, seats: 5, fuel: "Petrol", location: "Hyderabad" },
  { id: 3, name: "Hyundai Creta", image: hyundai, price: 3500, seats: 5, fuel: "Diesel", location: "Hyderabad" },
  { id: 4, name: "Thar Mahindra", image: thar, price: 4000, seats: 5, fuel: "Diesel", location: "Hyderabad" },
  { id: 5, name: "Suzuki Dzire", image: swift, price: 2500, seats: 5, fuel: "Petrol", location: "Hyderabad" },
  { id: 6, name: "Tesla Model 3", image: tesla, price: 5200, seats: 5, fuel: "Electric", location: "Bangalore" },
  { id: 7, name: "Toyota Camry", image: toyota, price: 3100, seats: 5, fuel: "Petrol", location: "Bangalore" },
  { id: 8, name: "Hyundai Creta", image: hyundai, price: 3600, seats: 5, fuel: "Diesel", location: "Bangalore" },
  { id: 9, name: "Thar Mahindra", image: thar, price: 4200, seats: 5, fuel: "Diesel", location: "Bangalore" },
  { id: 10, name: "Suzuki Dzire", image: swift, price: 2700, seats: 5, fuel: "Petrol", location: "Bangalore" },
];

const CarD = () => {
  const [locationFilter, setLocationFilter] = useState('All');
  const [fuelFilter, setFuelFilter] = useState('All');
  const navigate = useNavigate();



  const filteredCars = carData.filter(car => {
    return (locationFilter === 'All' || car.location === locationFilter) &&
           (fuelFilter === 'All' || car.fuel === fuelFilter);
  });

  return (
    <div className="car-rental-container2">
      {/* Navbar */}
      {/* <nav className="car-navbar">
        <div className="navbar-brand">CarRental</div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/cars" className="active">Cars</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="navbar-actions">
          <button className="login-btn">Login</button>
          <button className="register-btn">Register</button>
        </div>
      </nav> */}

      {/* Filter Section */}
      <div className="filter-section2">
        <div className="filter-group2">
          <label htmlFor="location">Location:</label>
          <select 
            id="location" 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="All">All Locations</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>
        
        <div className="filter-group2">
          <label htmlFor="fuel">Fuel Type:</label>
          <select 
            id="fuel" 
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
          >
            <option value="All">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="car-grid2">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id} className="car-card2">
              <div className="car-badge2">{car.location}</div>
              <img 
                src={car.image} 
                alt={car.name} 
                className="car-image2" 
              />
              <div className="car-info2">
                <h2>{car.name}</h2>
                <div className="car-specs2">
                  <p><i className="fas fa-users2"></i> {car.seats} seats</p>
                  <p><i className="fas fa-gas-pump2"></i> {car.fuel}</p>
                </div>
                <div className="car-price2">
                  <span>₹{car.price}</span>
                  <small>/day</small>
                </div>
              
              </div>
            </div>
          ))
        ) : (
          <div className="no-cars2">
            <h3>No cars available matching your filters</h3>
            <button 
              className="reset-btn2"
              onClick={() => {
                setLocationFilter('All');
                setFuelFilter('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarD;

// import React from 'react'

// const CarD = () => {
//   return (
//     <div>CarD</div>
//   )
// }

// export default CarD