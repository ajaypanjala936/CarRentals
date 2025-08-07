








import React from 'react';
import { useLocation } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
  const location = useLocation();
  const { bookingData, paymentDetails } = location.state || {};

  if (!bookingData || !paymentDetails) {
    return (
      <div className="confirmation-error">
        <h2>No booking confirmation found</h2>
        <p>Please complete your booking process</p>
        <button onClick={() => window.location.href = '/'}>Back to Home</button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatPaymentMethod = (method) => {
    const methods = {
      creditCard: 'Credit Card',
      debitCard: 'Debit Card',
      upi: 'UPI',
      netBanking: 'Net Banking'
    };
    return methods[method] || method || "Not specified";
  };

  const getImageUrl = () => {
    // Check multiple possible paths for the image
    const imagePath = bookingData.carDetails?.image || bookingData.car?.image;
    
    if (!imagePath) {
      return "https://via.placeholder.com/600x400?text=Car+Image";
    }
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/uploads/${imagePath}`;
  };

  // Safely extract all needed data with proper fallbacks
  const carDetails = bookingData.carDetails || bookingData.car || {};
  const bookingDetails = bookingData.bookingDetails || {};
  const userDetails = bookingData.userDetails || {};
  const locationText = bookingData.location || 
                       bookingDetails.location || 
                       carDetails.location || 
                       "N/A";

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <div className="confirmation-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-subtitle">
          Your booking reference: <strong>CR{Date.now().toString().slice(-6)}</strong>
        </p>
      </div>

      <div className="confirmation-details">
        <div className="details-section">
          <h2><i className="fas fa-car"></i> Car Details</h2>
          <div className="car-info">
            <img 
              src={getImageUrl()}
              alt={carDetails.name || "Car"}
              className="car-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x400?text=Car+Image";
              }}
            />
            <div className="car-details">
              <h3>{carDetails.name || "Car Name Not Available"}</h3>
              <p>Transmission: {carDetails.transmission || "N/A"}</p>
              <p>Fuel: {carDetails.fuelType || carDetails.fuel || "N/A"}</p>
              <p>Seats: {carDetails.seats || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2><i className="far fa-calendar-alt"></i> Rental Period</h2>
          <div className="date-details">
            <div className="date-item">
              <span>Pickup Location:</span>
              <strong>{locationText}</strong>
            </div>
            <div className="date-item">
              <span>Pickup Date:</span>
              <strong>{formatDate(bookingDetails.startDate)}</strong>
            </div>
            <div className="date-item">
              <span>Return Date:</span>
              <strong>{formatDate(bookingDetails.endDate)}</strong>
            </div>
            <div className="date-item">
              <span>Total Days:</span>
              <strong>{bookingDetails.totalDays || 0}</strong>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2><i className="fas fa-user"></i> User Information</h2>
          <div className="user-details">
            <div className="detail-item">
              <span>Name:</span>
              <span>{userDetails.name || "Not Provided"}</span>
            </div>
            <div className="detail-item">
              <span>Email:</span>
              <span>{userDetails.email || "Not Provided"}</span>
            </div>
            <div className="detail-item">
              <span>Phone:</span>
              <span>{userDetails.phone || "Not Provided"}</span>
            </div>
            <div className="detail-item">
              <span>Address:</span>
              <span>{userDetails.address || "Not Provided"}</span>
            </div>
            <div className="detail-item">
              <span>Aadhaar Number:</span>
              <span>{userDetails.aadhaar || "Not Provided"}</span>
            </div>
            <div className="detail-item">
              <span>Aadhaar Copy:</span>
              <span>{userDetails.aadhaarFile || bookingData.aadhaarFile || "Not Uploaded"}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2><i className="fas fa-credit-card"></i> Payment Information</h2>
          <div className="payment-details">
            <div className="detail-item">
              <span>Payment Method:</span>
              <span>{formatPaymentMethod(paymentDetails.method)}</span>
            </div>
            <div className="detail-item">
              <span>Amount Paid:</span>
              <span>₹{(bookingDetails.totalPrice || 0).toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span>Payment Status:</span>
              <span className="status-success">Success</span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="print-btn" onClick={() => window.print()}>
            <i className="fas fa-print"></i> Print Confirmation
          </button>
          <button className="home-btn" onClick={() => window.location.href = '/'}>
            <i className="fas fa-home"></i> Back to Home
          </button>
        </div>
      </div>
      <div className="confirmation-footer">
        <p>Thank you for choosing our service! A confirmation has been sent to your email.</p>
        <p>For any questions, please contact our customer support at support@carrental.com</p>
      </div>
    </div>
  );
};

export default Confirmation;