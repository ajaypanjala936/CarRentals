







import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure all properties from location.state with proper fallbacks
  const { 
    car = {}, 
    totalDays = 0, 
    totalPrice = 0, 
    startDate = "", 
    endDate = "", 
    pickupLocation = "Not specified" 
  } = location.state || {};

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    aadhaar: "",
  });
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors({...errors, aadhaarFile: "File size should be less than 2MB"});
      } else {
        setAadhaarFile(file);
        setErrors({...errors, aadhaarFile: ""});
      }
    } else {
      setErrors({...errors, aadhaarFile: "Please upload a valid image or PDF (max 2MB)"});
    }
  };

  const handleBooking = () => {
    const newErrors = {};
    
    if (!userDetails.name.trim()) newErrors.name = "Name is required";
    if (!userDetails.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(userDetails.email)) newErrors.email = "Email is invalid";
    if (!userDetails.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(userDetails.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!userDetails.address.trim()) newErrors.address = "Address is required";
    if (!userDetails.aadhaar.trim()) newErrors.aadhaar = "Aadhaar number is required";
    else if (!/^\d{12}$/.test(userDetails.aadhaar)) newErrors.aadhaar = "Aadhaar must be 12 digits";
    if (!aadhaarFile) newErrors.aadhaarFile = "Aadhaar copy is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const bookingData = {
      userDetails: { ...userDetails },
      carDetails: {
        ...car,
        pickupLocation // Include pickup location in car details
      },
      bookingDetails: { 
        startDate, 
        endDate, 
        totalDays, 
        totalPrice,
        pickupLocation // Include in booking details as well
      },
      aadhaarFile: aadhaarFile.name
    };
    
    navigate("/payment", { state: { bookingData } });
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Complete Your Booking</h1>
        <p>Please verify your details and complete the booking process</p>
      </div>

      <div className="booking-content">
        <div className="car-summary">
          <div className="car-info">
            <img 
              src={car.image ? `http://localhost:5000/uploads/${car.image}` : "https://via.placeholder.com/150"} 
              alt={car.name || "Car"} 
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=Car+Image";
              }}
            />
            <div className="car-details">
              <h3>{car.name || "Car Name"}</h3>
              <p>{car.model || "Car Model"}</p>
            </div>
          </div>
          
          <div className="booking-details">
            <h3>Booking Details</h3>
            <div className="detail-row">
              <span>Pickup Location:</span>
              <span>{pickupLocation}</span>
            </div>
            <div className="detail-row">
              <span>Pickup Date:</span>
              <span>{startDate || "Not specified"}</span>
            </div>
            <div className="detail-row">
              <span>Return Date:</span>
              <span>{endDate || "Not specified"}</span>
            </div>
            <div className="detail-row">
              <span>Total Days:</span>
              <span>{totalDays}</span>
            </div>
            <div className="detail-row total">
              <span>Total Price:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="booking-form">
          <h2>Personal Information</h2>
          
          <div className={`form-group ${errors.name ? 'error' : ''}`}>
            <label>Full Name*</label>
            <input
              type="text"
              value={userDetails.name}
              onChange={(e) => {
                setUserDetails({ ...userDetails, name: e.target.value });
                setErrors({...errors, name: ""});
              }}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label>Email*</label>
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value });
                setErrors({...errors, email: ""});
              }}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className={`form-group ${errors.phone ? 'error' : ''}`}>
            <label>Phone Number*</label>
            <input
              type="tel"
              value={userDetails.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setUserDetails({ ...userDetails, phone: value });
                setErrors({...errors, phone: ""});
              }}
              placeholder="Enter your 10-digit phone number"
              maxLength="10"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className={`form-group ${errors.address ? 'error' : ''}`}>
            <label>Address*</label>
            <textarea
              value={userDetails.address}
              onChange={(e) => {
                setUserDetails({ ...userDetails, address: e.target.value });
                setErrors({...errors, address: ""});
              }}
              placeholder="Enter your full address"
              rows="3"
            ></textarea>
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className={`form-group ${errors.aadhaar ? 'error' : ''}`}>
            <label>Aadhaar Number*</label>
            <input
              type="text"
              value={userDetails.aadhaar}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setUserDetails({ ...userDetails, aadhaar: value });
                setErrors({...errors, aadhaar: ""});
              }}
              placeholder="Enter 12-digit Aadhaar number"
              maxLength="12"
            />
            {errors.aadhaar && <span className="error-message">{errors.aadhaar}</span>}
          </div>

          <div className={`form-group ${errors.aadhaarFile ? 'error' : ''}`}>
            <label>Upload Aadhaar Copy*</label>
            <div className="file-upload">
              <input
                type="file"
                id="aadhaar-upload"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
              <label htmlFor="aadhaar-upload" className="upload-btn">
                {aadhaarFile ? aadhaarFile.name : "Choose File"}
              </label>
            </div>
            <p className="file-hint">Upload clear image or PDF of your Aadhaar card (max 2MB)</p>
            {errors.aadhaarFile && <span className="error-message">{errors.aadhaarFile}</span>}
          </div>

          <div className="terms-agreement">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> and confirm that all information provided is accurate.
            </label>
          </div>

          <button className="confirm-btn" onClick={handleBooking}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;