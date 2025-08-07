


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import "./CarDetails.css";

// import tesla from "./images/Tesla-Model-3-No-Background.png";
// import toyota from "./images/camry_010_s.jpg";
// import hyundai from "./images/hyundai certa.jpg";
// import thar from "./images/thar.webp1.png";
// import swift from "./images/swift.webp";

// const carData = [
//   { 
//     id: 1, 
//     name: "Tesla Model 3", 
//     image: tesla, 
//     price: 5000, 
//     seats: 5, 
//     fuel: "Electric", 
//     location: "Hyderabad",
//     features: ["Autopilot", "Premium Sound", "Keyless Entry"] 
//   },
//   { 
//     id: 2, 
//     name: "Toyota Camry", 
//     image: toyota, 
//     price: 3000, 
//     seats: 5, 
//     fuel: "Petrol", 
//     location: "Hyderabad",
//     features: ["Sunroof", "Navigation", "Leather Seats"] 
//   },
//   { 
//     id: 3, 
//     name: "Hyundai Creta", 
//     image: hyundai, 
//     price: 3500, 
//     seats: 5, 
//     fuel: "Diesel", 
//     location: "Hyderabad",
//     features: ["Touchscreen", "Rear Camera", "Automatic AC"] 
//   },
//   { 
//     id: 4, 
//     name: "Thar Mahindra", 
//     image: thar, 
//     price: 4000, 
//     seats: 5, 
//     fuel: "Diesel", 
//     location: "Hyderabad",
//     features: ["4WD", "Off-road Mode", "Alloy Wheels"] 
//   },
//   { 
//     id: 5, 
//     name: "Suzuki Dzire", 
//     image: swift, 
//     price: 2500, 
//     seats: 5, 
//     fuel: "Petrol", 
//     location: "Hyderabad",
//     features: ["Bluetooth", "Power Windows", "Airbags"] 
//   },
//   { 
//     id: 6, 
//     name: "Tesla Model 3", 
//     image: tesla, 
//     price: 5000, 
//     seats: 5, 
//     fuel: "Electric", 
//     location: "Bangalore",
//     features: ["Autopilot", "Premium Sound", "Keyless Entry"] 
//   },
//   { 
//     id: 7, 
//     name: "Toyota Camry", 
//     image: toyota, 
//     price: 3000, 
//     seats: 5, 
//     fuel: "Petrol", 
//     location: "Bangalore",
//     features: ["Sunroof", "Navigation", "Leather Seats"] 
//   },
//   { 
//     id: 8, 
//     name: "Hyundai Creta", 
//     image: hyundai, 
//     price: 3500, 
//     seats: 5, 
//     fuel: "Diesel", 
//     location: "Bangalore",
//     features: ["Touchscreen", "Rear Camera", "Automatic AC"] 
//   },
//   { 
//     id: 9, 
//     name: "Thar Mahindra", 
//     image: thar, 
//     price: 4000, 
//     seats: 5, 
//     fuel: "Diesel", 
//     location: "Bangalore",
//     features: ["4WD", "Off-road Mode", "Alloy Wheels"] 
//   },
//   { 
//     id: 10, 
//     name: "Suzuki Dzire", 
//     image: swift, 
//     price: 2500, 
//     seats: 5, 
//     fuel: "Petrol", 
//     location: "Bangalore",
//     features: ["Bluetooth", "Power Windows", "Airbags"] 
//   },
//   // ... similar for Bangalore cars (add features to each)
// ];

// const CarDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);

//   const selectedLocation = queryParams.get("location");
//   const selectedStartDate = queryParams.get("startDate");
//   const selectedEndDate = queryParams.get("endDate");

//   const [car, setCar] = useState(null);
//   const [totalDays, setTotalDays] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     const selectedCar = carData.find((c) => c.id === parseInt(id));
//     setCar(selectedCar);

//     if (selectedStartDate && selectedEndDate && selectedCar) {
//       const start = new Date(selectedStartDate);
//       const end = new Date(selectedEndDate);
//       const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//       setTotalDays(days);
//       setTotalPrice(days * selectedCar.price);
//     }
//   }, [id, selectedStartDate, selectedEndDate]);

//   const handleBooking = () => {
//     if (!car) return;

//     navigate(`/booking/${id}`, {
//       state: {
//         car,
//         location: selectedLocation,
//         startDate: selectedStartDate,
//         endDate: selectedEndDate,
//         totalDays,
//         totalPrice,
//       },
//     });
//   };

//   if (!car) {
//     return <div className="loading">Loading car details...</div>;
//   }

//   return (


// <div className="car-details-container">
//       <div className="car-details-header">
//         <h1>{car.name}</h1>
//         <p className="location-badge">{selectedLocation}</p>
//       </div>

//       <div className="car-details-content">
//         <div className="car-image-container">
//           <img src={car.image} alt={car.name} />
//         </div>

//         <div className="booking-details">
//           <h2>Booking Summary</h2>
//           <div className="detail-row">
//             <span>Pickup Location:</span>
//             <span>{selectedLocation}</span>
//           </div>
//           <div className="detail-row">
//             <span>Pickup Date:</span>
//             <span>{selectedStartDate}</span>
//           </div>
//           <div className="detail-row">
//             <span>Return Date:</span>
//             <span>{selectedEndDate}</span>
//           </div>
//           <div className="detail-row">
//             <span>Rental Duration:</span>
//             <span>{totalDays} day{totalDays !== 1 ? 's' : ''}</span>
//           </div>

//           <h2>Car Specifications</h2>
//           <div className="detail-row">
//             <span>Seating Capacity:</span>
//             <span>{car.seats} persons</span>
//           </div>
//           <div className="detail-row">
//             <span>Fuel Type:</span>
//             <span>{car.fuel}</span>
//           </div>
          
//           {car.features && car.features.length > 0 && (
//             <div className="features">
//               <h3>Features</h3>
//               <ul>
//                 {car.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="price-summary">
//           <h2>Price Breakdown</h2>
//           <div className="price-row">
//             <span>Daily Rate:</span>
//             <span>₹{car.price}/day</span>
//           </div>
//           <div className="price-row">
//             <span>Total Days:</span>
//             <span>{totalDays}</span>
//           </div>
//           <div className="price-row total">
//             <span>Total Price:</span>
//             <span>₹{totalPrice}</span>
//           </div>
          
//           <button 
//             onClick={handleBooking} 
//             className="book-now-btn"
//           >
//             Book Now
//           </button>
          
//           <button 
//             onClick={() => navigate(-1)} 
//             className="back-btn"
//           >
//             Back to Cars
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;




// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./CarDetails.css";

// const CarDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);

//   const selectedLocation = queryParams.get("location1");
//   const selectedStartDate = queryParams.get("startDate");
//   const selectedEndDate = queryParams.get("endDate");

//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalDays, setTotalDays] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Replace with your actual API endpoint
//         const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
        
//         if (!response.data) {
//           throw new Error("Car not found");
//         }
        
//         setCar(response.data);
        
//         if (selectedStartDate && selectedEndDate) {
//           const start = new Date(selectedStartDate);
//           const end = new Date(selectedEndDate);
//           const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
//           setTotalDays(days);
//           setTotalPrice(days * response.data.price);
//         }
//       } catch (err) {
//         console.error("Error fetching car details:", err);
//         setError(err.message || "Failed to load car details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCarDetails();
//   }, [id, selectedStartDate, selectedEndDate]);

//   const handleBooking = () => {
//     if (!car) return;

//     navigate(`/booking/${id}`, {
//       state: {
//         car,
//         location: selectedLocation,
//         startDate: selectedStartDate,
//         endDate: selectedEndDate,
//         totalDays,
//         totalPrice,
//       },
//     });
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading car details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">{error}</p>
//         <button 
//           onClick={() => window.location.reload()} 
//           className="retry-btn"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!car) {
//     return (
//       <div className="not-found-container">
//         <h2>Car Not Found</h2>
//         <p>The requested car could not be found.</p>
//         <button 
//           onClick={() => navigate("/")} 
//           className="back-btn"
//         >
//           Back to Cars
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="car-details-container">
//       <div className="car-details-header">
//         <h1>{car.name}</h1>
//         <p className="location-badge">{selectedLocation}</p>
//       </div>

//       <div className="car-details-content">
//         <div className="car-image-container">
//           <img 
//             src={`http://localhost:5000/uploads/${car.image}`} 
//             alt={car.name}
//             onError={(e) => {
//               e.target.src = "https://via.placeholder.com/600x400?text=Car+Image";
//             }}
//           />
//         </div>

//         <div className="booking-details">
//           <h2>Booking Summary</h2>
//           <div className="detail-row">
//             <span>Pickup Location:</span>
//             <span>{selectedLocation}</span>
//           </div>
//           <div className="detail-row">
//             <span>Pickup Date:</span>
//             <span>{selectedStartDate || "Not selected"}</span>
//           </div>
//           <div className="detail-row">
//             <span>Return Date:</span>
//             <span>{selectedEndDate || "Not selected"}</span>
//           </div>
//           <div className="detail-row">
//             <span>Rental Duration:</span>
//             <span>
//               {totalDays > 0 ? `${totalDays} day${totalDays !== 1 ? 's' : ''}` : "Not calculated"}
//             </span>
//           </div>

//           <h2>Car Specifications</h2>
//           <div className="detail-row">
//             <span>Seating Capacity:</span>
//             <span>{car.seats} persons</span>
//           </div>
//           <div className="detail-row">
//             <span>Fuel Type:</span>
//             <span>{car.fuel}</span>
//           </div>
//           <div className="detail-row">
//             <span>Transmission:</span>
//             <span>{car.transmission || "Automatic"}</span>
//           </div>
          
//           {car.features && car.features.length > 0 && (
//             <div className="features">
//               <h3>Features</h3>
//               <ul>
//                 {car.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="price-summary">
//           <h2>Price Breakdown</h2>
//           <div className="price-row">
//             <span>Daily Rate:</span>
//             <span>₹{car.price}/day</span>
//           </div>
//           {totalDays > 0 && (
//             <>
//               <div className="price-row">
//                 <span>Total Days:</span>
//                 <span>{totalDays}</span>
//               </div>
//               <div className="price-row total">
//                 <span>Total Price:</span>
//                 <span>₹{totalPrice}</span>
//               </div>
//             </>
//           )}
          
//           <button 
//             onClick={handleBooking} 
//             className="book-now-btn"
//             disabled={!selectedStartDate || !selectedEndDate}
//           >
//             {selectedStartDate && selectedEndDate ? "Book Now" : "Select Dates to Book"}
//           </button>
          
//           <button 
//             onClick={() => navigate(-1)} 
//             className="back-btn"
//           >
//             Back to Cars
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;












import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const selectedLocation = queryParams.get("location");
  const selectedStartDate = queryParams.get("startDate");
  const selectedEndDate = queryParams.get("endDate");

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Replace with your actual API endpoint
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
        
        if (!response.data) {
          throw new Error("Car not found");
        }
        
        setCar(response.data);
        
        if (selectedStartDate && selectedEndDate) {
          const start = new Date(selectedStartDate);
          const end = new Date(selectedEndDate);
          const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
          setTotalDays(days);
          setTotalPrice(days * response.data.price);
        }
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError(err.message || "Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id, selectedStartDate, selectedEndDate]);

  const handleBooking = () => {
    if (!car) return;

    navigate(`/booking/${id}`, {
      state: {
        car,
        pickupLocation: selectedLocation, // Changed from 'location' to 'pickupLocation' for clarity
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        totalDays,
        totalPrice,
      },
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading car details...</p>
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
          Try Again
        </button>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="not-found-container">
        <h2>Car Not Found</h2>
        <p>The requested car could not be found.</p>
        <button 
          onClick={() => navigate("/")} 
          className="back-btn"
        >
          Back to Cars
        </button>
      </div>
    );
  }

  return (
    <div className="car-details-container">
      <div className="car-details-header">
        <h1>{car.name}</h1>
        <p className="location-badge">{selectedLocation}</p>
      </div>

      <div className="car-details-content">
        <div className="car-image-container">
          <img 
            src={`http://localhost:5000/uploads/${car.image}`} 
            alt={car.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400?text=Car+Image";
            }}
          />
        </div>

        <div className="booking-details">
          <h2>Booking Summary</h2>
          <div className="detail-row">
            <span>Pickup Location:</span>
            <span>{selectedLocation}</span>
          </div>
          <div className="detail-row">
            <span>Pickup Date:</span>
            <span>{selectedStartDate || "Not selected"}</span>
          </div>
          <div className="detail-row">
            <span>Return Date:</span>
            <span>{selectedEndDate || "Not selected"}</span>
          </div>
          <div className="detail-row">
            <span>Rental Duration:</span>
            <span>
              {totalDays > 0 ? `${totalDays} day${totalDays !== 1 ? 's' : ''}` : "Not calculated"}
            </span>
          </div>

          <h2>Car Specifications</h2>
          <div className="detail-row">
            <span>Seating Capacity:</span>
            <span>{car.seats} persons</span>
          </div>
          <div className="detail-row">
            <span>Fuel Type:</span>
            <span>{car.fuel}</span>
          </div>
          <div className="detail-row">
            <span>Transmission:</span>
            <span>{car.transmission || "Automatic"}</span>
          </div>
          
          {car.features && car.features.length > 0 && (
            <div className="features">
              <h3>Features</h3>
              <ul>
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="price-summary">
          <h2>Price Breakdown</h2>
          <div className="price-row">
            <span>Daily Rate:</span>
            <span>₹{car.price}/day</span>
          </div>
          {totalDays > 0 && (
            <>
              <div className="price-row">
                <span>Total Days:</span>
                <span>{totalDays}</span>
              </div>
              <div className="price-row total">
                <span>Total Price:</span>
                <span>₹{totalPrice}</span>
              </div>
            </>
          )}
          
          <button 
            onClick={handleBooking} 
            className="book-now-btn"
            disabled={!selectedStartDate || !selectedEndDate}
          >
            {selectedStartDate && selectedEndDate ? "Book Now" : "Select Dates to Book"}
          </button>
          
          <button 
            onClick={() => navigate(-1)} 
            className="back-btn"
          >
            Back to Cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;