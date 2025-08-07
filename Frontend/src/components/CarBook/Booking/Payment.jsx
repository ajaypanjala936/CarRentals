

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './Payment.css';

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bookingData } = location.state || {};
//   const [paymentMethod, setPaymentMethod] = useState('creditCard');
//   const [formData, setFormData] = useState({
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     cvv: '',
//     upiId: '',
//     netBankingBank: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [promoCode, setPromoCode] = useState('');
//   const [appliedPromo, setAppliedPromo] = useState(null);
//   const [promoError, setPromoError] = useState('');

//   const promoCodes = {
//     "SAVE10": { discount: 10, minAmount: 10000 },
//     "FESTIVE20": { discount: 20, minAmount: 15000 },
//     "WELCOME15": { discount: 15, minAmount: 20000 }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
//       if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
//       if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
//       if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
//       if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
//     } else if (paymentMethod === 'upi') {
//       if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
//     } else if (paymentMethod === 'netBanking') {
//       if (!formData.netBankingBank.trim()) newErrors.netBankingBank = 'Please select a bank';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const calculateDiscount = () => {
//     if (!appliedPromo) return 0;
//     const discount = (bookingData.bookingDetails.totalPrice * appliedPromo.discount) / 100;
//     return Math.round(discount);
//   };

//   const calculateFinalAmount = () => {
//     const totalPrice = bookingData.bookingDetails.totalPrice;
//     return appliedPromo ? totalPrice - calculateDiscount() : totalPrice;
//   };

//   const applyPromoCode = () => {
//     const promo = promoCodes[promoCode.toUpperCase()];
//     if (!promo) {
//       setPromoError('Invalid promo code');
//       return;
//     }

//     if (bookingData.bookingDetails.totalPrice < promo.minAmount) {
//       setPromoError(`Minimum amount for ${promoCode.toUpperCase()} is ₹${promo.minAmount}`);
//       return;
//     }

//     setAppliedPromo({ code: promoCode.toUpperCase(), discount: promo.discount });
//     setPromoError('');
//   };

//   const removePromoCode = () => {
//     setAppliedPromo(null);
//     setPromoCode('');
//     setPromoError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
  
//     setIsProcessing(true);
  
//     try {
//       // Prepare booking data with proper location reference
//       const bookingDataToSend = {
//         userDetails: {
//           name: bookingData.userDetails.name,
//           email: bookingData.userDetails.email,
//           phone: bookingData.userDetails.phone,
//           address: bookingData.userDetails.address,
//           aadhaar: bookingData.userDetails.aadhaar,
//           aadhaarFile: bookingData.aadhaarFile
//         },
//         carDetails: {
//           name: bookingData.carDetails.name,
//           image: bookingData.carDetails.image,
//           transmission: bookingData.carDetails.transmission,
//           fuelType: bookingData.carDetails.fuelType || bookingData.carDetails.fuel,
//           seats: bookingData.carDetails.seats
//         },
//         bookingDetails: {
//           startDate: bookingData.bookingDetails.startDate,
//           endDate: bookingData.bookingDetails.endDate,
//           totalDays: bookingData.bookingDetails.totalDays,
//           totalPrice: bookingData.bookingDetails.totalPrice,
//           location: bookingData.bookingDetails.pickupLocation || 
//                    bookingData.bookingDetails.location || 
//                    bookingData.pickupLocation ||
//                    'Not specified'
//         }
//       };
//       const paymentDetailsToSend = {
//         method: paymentMethod,
//         amount: calculateFinalAmount(),
//         originalAmount: bookingData.bookingDetails.totalPrice,
//         discount: appliedPromo ? {
//           code: appliedPromo.code,
//           amount: calculateDiscount(),
//           percentage: appliedPromo.discount
//         } : null
//       };
      
//       // Save booking to MongoDB
//       await fetch('http://localhost:5000/api/bookings/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...bookingDataToSend,
//           paymentDetails: paymentDetailsToSend
//         })
//       });
      

//       // Send confirmation email
//       const emailResponse = await fetch('http://localhost:5000/api/send-confirmation-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: bookingData.userDetails.email,
//           userDetails: bookingDataToSend.userDetails,
//           bookingData: bookingDataToSend,
//           paymentDetails: paymentDetailsToSend
//         })
//       });
  
//       const emailResult = await emailResponse.json();
      
//       if (!emailResponse.ok) {
//         throw new Error(emailResult.error || 'Failed to send confirmation email');
//       }
  
//       // Navigate to confirmation page
//       navigate('/booking-confirmation', {
//         state: {
//           bookingData: bookingDataToSend,
//           paymentDetails: paymentDetailsToSend
//         }
//       });
//     } catch (error) {
//       console.error('Booking submission error:', error);
//       alert(error.message || 'An error occurred during booking');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (!bookingData) {
//     return (
//       <div className="payment-container">
//         <div className="error-message">
//           <h2>No booking details found</h2>
//           <p>Please start your booking process again</p>
//           <button onClick={() => navigate('/')}>Back to Home</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="payment-container">
//       <div className="payment-header">
//         <h1>Complete Your Payment</h1>
//         <p>Secure payment gateway powered by Razorpay</p>
//       </div>

//       <div className="payment-content">
//         <div className="booking-summary">
//           <h2>Booking Summary</h2>
//           <div className="summary-item">
//           <div className="car-image-container3">
//             <img 
//               src={bookingData.carDetails.image ? `http://localhost:5000/uploads/${bookingData.carDetails.image}` : "https://via.placeholder.com/300x150?text=Car+Image"} 
//               alt={bookingData.carDetails.name || "Car"} 
//               className="car-image3"
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/300x150?text=Car+Image";
//               }}
//             />
//           </div>
           
//           </div>
//           <span className='span1'>Car Model:          {bookingData.carDetails.name}</span>
//           <div className="summary-item">
          
         
//             <span>Pickup Location:</span>
//             <span>{bookingData.bookingDetails.pickupLocation || 
//                   bookingData.bookingDetails.location || 
//                   bookingData.pickupLocation ||
//                   'Not specified'}</span>
//           </div>
//           <div className="summary-item">
//             <span>Rental Period:</span>
//             <span>{bookingData.bookingDetails.totalDays} days</span>
//           </div>
//           <div className="summary-item">
//             <span>Pickup Date:</span>
//             <span>{bookingData.bookingDetails.startDate}</span>
//           </div>
//           <div className="summary-item">
//             <span>Return Date:</span>
//             <span>{bookingData.bookingDetails.endDate}</span>
//           </div>

//           <div className="promo-code-section">
//             <div className="promo-input-group">
//               <input
//                 type="text"
//                 placeholder="Enter promo code"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//                 disabled={!!appliedPromo}
//               />
//               {appliedPromo ? (
//                 <button type="button" className="remove-promo-btn" onClick={removePromoCode}>
//                   Remove
//                 </button>
//               ) : (
//                 <button type="button" className="apply-promo-btn" onClick={applyPromoCode}>
//                   Apply
//                 </button>
//               )}
//             </div>
//             {promoError && <div className="promo-error">{promoError}</div>}
//             {appliedPromo && (
//               <div className="promo-success">
//                 Promo code applied: {appliedPromo.code} ({appliedPromo.discount}% off)
//               </div>
//             )}
//           </div>

//           <div className="summary-item">
//             <span>Subtotal:</span>
//             <span>₹{bookingData.bookingDetails.totalPrice}</span>
//           </div>

//           {appliedPromo && (
//             <div className="summary-item discount">
//               <span>Discount ({appliedPromo.discount}%):</span>
//               <span>-₹{calculateDiscount()}</span>
//             </div>
//           )}

//           <div className="summary-item total">
//             <span>Total Amount:</span>
//             <span>₹{calculateFinalAmount()}</span>
//           </div>
//         </div>

//         <div className="payment-form">
//           <h2>Select Payment Method</h2>

//           <div className="payment-methods3">
//             {["Google Pay", "PhonePe", "Paytm", "Credit/Debit Card"].map((method, index) => (
//               <button
//                 key={index}
//                 className={`payment-button ${
//                   paymentMethod === 
//                     (method === "Google Pay" || method === "PhonePe" || method === "Paytm" 
//                       ? "upi" 
//                       : "creditCard") ? "selected" : ""
//                 }`}
//                 onClick={() => setPaymentMethod(
//                   method === "Google Pay" || method === "PhonePe" || method === "Paytm"
//                     ? "upi"
//                     : "creditCard"
//                 )}
//               >
//                 <img
//                   width="35"
//                   height="35"
//                   src={
//                     method === "Google Pay" ? "https://img.icons8.com/fluency/30/google-pay.png" :
//                     method === "PhonePe" ? "https://img.icons8.com/color/100/phone-pe.png" :
//                     method === "Paytm" ? "https://img.icons8.com/color/35/paytm.png" :
//                     "https://img.icons8.com/emoji/35/credit-card-emoji.png"
//                   }
//                   alt={method.toLowerCase().replace(/ /g, "-")}
//                 />
//                 {method}
//               </button>
//             ))}
//           </div>

//           <form onSubmit={handleSubmit}>
//             {paymentMethod === 'creditCard' || paymentMethod === 'debitCard' ? (
//               <div className="card-form">
//                 <div className={`form-group ${errors.cardNumber ? 'error' : ''}`}>
//                   <label>Card Number</label>
//                   <input
//                     type="text"
//                     name="cardNumber"
//                     value={formData.cardNumber}
//                     onChange={handleInputChange}
//                     placeholder="1234 5678 9012 3456"
//                     maxLength="16"
//                   />
//                   {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
//                 </div>
//                 <div className={`form-group ${errors.cardName ? 'error' : ''}`}>
//                   <label>Name on Card</label>
//                   <input
//                     type="text"
//                     name="cardName"
//                     value={formData.cardName}
//                     onChange={handleInputChange}
//                     placeholder="John Doe"
//                   />
//                   {errors.cardName && <span className="error-message">{errors.cardName}</span>}
//                 </div>
//                 <div className="form-row">
//                   <div className={`form-group ${errors.expiryDate ? 'error' : ''}`}>
//                     <label>Expiry Date</label>
//                     <input
//                       type="text"
//                       name="expiryDate"
//                       value={formData.expiryDate}
//                       onChange={handleInputChange}
//                       placeholder="MM/YY"
//                       maxLength="5"
//                     />
//                     {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
//                   </div>
//                   <div className={`form-group ${errors.cvv ? 'error' : ''}`}>
//                     <label>CVV</label>
//                     <input
//                       type="text"
//                       name="cvv"
//                       value={formData.cvv}
//                       onChange={handleInputChange}
//                       placeholder="123"
//                       maxLength="3"
//                     />
//                     {errors.cvv && <span className="error-message">{errors.cvv}</span>}
//                   </div>
//                 </div>
//               </div>
//             ) : paymentMethod === 'upi' ? (
//               <div className={`form-group ${errors.upiId ? 'error' : ''}`}>
//                 <label>UPI ID</label>
//                 <input
//                   type="text"
//                   name="upiId"
//                   value={formData.upiId}
//                   onChange={handleInputChange}
//                   placeholder="yourname@upi"
//                 />
//                 {errors.upiId && <span className="error-message">{errors.upiId}</span>}
//               </div>
//             ) : paymentMethod === 'netBanking' ? (
//               <div className={`form-group ${errors.netBankingBank ? 'error' : ''}`}>
//                 <label>Select Bank</label>
//                 <select
//                   name="netBankingBank"
//                   value={formData.netBankingBank}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select your bank</option>
//                   <option value="sbi">State Bank of India</option>
//                   <option value="hdfc">HDFC Bank</option>
//                   <option value="icici">ICICI Bank</option>
//                   <option value="axis">Axis Bank</option>
//                   <option value="kotak">Kotak Mahindra Bank</option>
//                 </select>
//                 {errors.netBankingBank && <span className="error-message">{errors.netBankingBank}</span>}
//               </div>
//             ) : null}

//             <div className="terms-agreement">
//               <input type="checkbox" id="terms" required />
//               <label htmlFor="terms">
//                 I authorize CarRental to charge my payment method for the total amount shown.
//               </label>
//             </div>

//             <button type="submit" className="pay-now-btn" disabled={isProcessing}>
//               {isProcessing ? (
//                 <>
//                   <i className="fas fa-spinner fa-spin"></i> Processing...
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-lock"></i> Pay ₹{calculateFinalAmount()} Now
//                 </>
//               )}
//             </button>

//             <div className="security-info">
//               <i className="fas fa-shield-alt"></i>
//               <span>Your payment is secured with 256-bit SSL encryption</span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;


















import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    netBankingBank: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const promoCodes = {
    "SAVE10": { discount: 10, minAmount: 10000 },
    "FESTIVE20": { discount: 20, minAmount: 15000 },
    "WELCOME15": { discount: 15, minAmount: 20000 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    } else if (paymentMethod === 'upi') {
      if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
    } else if (paymentMethod === 'netBanking') {
      if (!formData.netBankingBank.trim()) newErrors.netBankingBank = 'Please select a bank';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const discount = (bookingData.bookingDetails.totalPrice * appliedPromo.discount) / 100;
    return Math.round(discount);
  };

  const calculateFinalAmount = () => {
    const totalPrice = bookingData.bookingDetails.totalPrice;
    return appliedPromo ? totalPrice - calculateDiscount() : totalPrice;
  };

  const applyPromoCode = () => {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (!promo) {
      setPromoError('Invalid promo code');
      return;
    }

    if (bookingData.bookingDetails.totalPrice < promo.minAmount) {
      setPromoError(`Minimum amount for ${promoCode.toUpperCase()} is ₹${promo.minAmount}`);
      return;
    }

    setAppliedPromo({ code: promoCode.toUpperCase(), discount: promo.discount });
    setPromoError('');
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsProcessing(true);
  
    try {
      // Prepare booking data without bookingReference
      const bookingDataToSend = {
        userDetails: {
          name: bookingData.userDetails.name,
          email: bookingData.userDetails.email,
          phone: bookingData.userDetails.phone,
          address: bookingData.userDetails.address,
          aadhaar: bookingData.userDetails.aadhaar,
          aadhaarFile: bookingData.aadhaarFile
        },
        carDetails: {
          name: bookingData.carDetails.name,
          image: bookingData.carDetails.image,
          transmission: bookingData.carDetails.transmission,
          fuelType: bookingData.carDetails.fuelType || bookingData.carDetails.fuel,
          seats: bookingData.carDetails.seats
        },
        bookingDetails: {
          startDate: bookingData.bookingDetails.startDate,
          endDate: bookingData.bookingDetails.endDate,
          totalDays: bookingData.bookingDetails.totalDays,
          totalPrice: bookingData.bookingDetails.totalPrice,
          location: bookingData.bookingDetails.pickupLocation || 
                   bookingData.bookingDetails.location || 
                   bookingData.pickupLocation ||
                   'Not specified'
        },
        paymentDetails: {
          method: paymentMethod,
          amount: calculateFinalAmount(),
          originalAmount: bookingData.bookingDetails.totalPrice,
          discount: appliedPromo ? {
            code: appliedPromo.code,
            amount: calculateDiscount(),
            percentage: appliedPromo.discount
          } : null
        }
      };
      
      // Save booking to MongoDB
      const bookingResponse = await fetch('http://localhost:5000/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDataToSend)
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const bookingResult = await bookingResponse.json();

      // Send confirmation email
      const emailResponse = await fetch('http://localhost:5000/api/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: bookingData.userDetails.email,
          userDetails: bookingDataToSend.userDetails,
          bookingData: {
            ...bookingDataToSend,
            bookingDetails: {
              ...bookingDataToSend.bookingDetails,
              
            }
          },
          paymentDetails: bookingDataToSend.paymentDetails
        })
      });
  
      const emailResult = await emailResponse.json();
      
      if (!emailResponse.ok) {
        throw new Error(emailResult.error || 'Failed to send confirmation email');
      }
  
      // Navigate to confirmation page
      navigate('/booking-confirmation', {
        state: {
          bookingData: {
            ...bookingDataToSend,
            bookingDetails: {
              ...bookingDataToSend.bookingDetails,
             
            }
          },
          paymentDetails: bookingDataToSend.paymentDetails
        }
      });
    } catch (error) {
      console.error('Booking submission error:', error);
      alert(error.message || 'An error occurred during booking');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="payment-container">
        <div className="error-message">
          <h2>No booking details found</h2>
          <p>Please start your booking process again</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Complete Your Payment</h1>
        <p>Secure payment gateway powered by Razorpay</p>
      </div>

      <div className="payment-content">
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <div className="summary-item">
          <div className="car-image-container3">
            <img 
              src={bookingData.carDetails.image ? `http://localhost:5000/uploads/${bookingData.carDetails.image}` : "https://via.placeholder.com/300x150?text=Car+Image"} 
              alt={bookingData.carDetails.name || "Car"} 
              className="car-image3"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x150?text=Car+Image";
              }}
            />
          </div>
           
          </div>
          <span className='span1'>Car Model:          {bookingData.carDetails.name}</span>
          <div className="summary-item">
          
         
            <span>Pickup Location:</span>
            <span>{bookingData.bookingDetails.pickupLocation || 
                  bookingData.bookingDetails.location || 
                  bookingData.pickupLocation ||
                  'Not specified'}</span>
          </div>
          <div className="summary-item">
            <span>Rental Period:</span>
            <span>{bookingData.bookingDetails.totalDays} days</span>
          </div>
          <div className="summary-item">
            <span>Pickup Date:</span>
            <span>{bookingData.bookingDetails.startDate}</span>
          </div>
          <div className="summary-item">
            <span>Return Date:</span>
            <span>{bookingData.bookingDetails.endDate}</span>
          </div>

          <div className="promo-code-section">
            <div className="promo-input-group">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={!!appliedPromo}
              />
              {appliedPromo ? (
                <button type="button" className="remove-promo-btn" onClick={removePromoCode}>
                  Remove
                </button>
              ) : (
                <button type="button" className="apply-promo-btn" onClick={applyPromoCode}>
                  Apply
                </button>
              )}
            </div>
            {promoError && <div className="promo-error">{promoError}</div>}
            {appliedPromo && (
              <div className="promo-success">
                Promo code applied: {appliedPromo.code} ({appliedPromo.discount}% off)
              </div>
            )}
          </div>

          <div className="summary-item">
            <span>Subtotal:</span>
            <span>₹{bookingData.bookingDetails.totalPrice}</span>
          </div>

          {appliedPromo && (
            <div className="summary-item discount">
              <span>Discount ({appliedPromo.discount}%):</span>
              <span>-₹{calculateDiscount()}</span>
            </div>
          )}

          <div className="summary-item total">
            <span>Total Amount:</span>
            <span>₹{calculateFinalAmount()}</span>
          </div>
        </div>

        <div className="payment-form">
          <h2>Select Payment Method</h2>

          <div className="payment-methods3">
            {["Google Pay", "PhonePe", "Paytm", "Credit/Debit Card"].map((method, index) => (
              <button
                key={index}
                className={`payment-button ${
                  paymentMethod === 
                    (method === "Google Pay" || method === "PhonePe" || method === "Paytm" 
                      ? "upi" 
                      : "creditCard") ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod(
                  method === "Google Pay" || method === "PhonePe" || method === "Paytm"
                    ? "upi"
                    : "creditCard"
                )}
              >
                <img
                  width="35"
                  height="35"
                  src={
                    method === "Google Pay" ? "https://img.icons8.com/fluency/30/google-pay.png" :
                    method === "PhonePe" ? "https://img.icons8.com/color/100/phone-pe.png" :
                    method === "Paytm" ? "https://img.icons8.com/color/35/paytm.png" :
                    "https://img.icons8.com/emoji/35/credit-card-emoji.png"
                  }
                  alt={method.toLowerCase().replace(/ /g, "-")}
                />
                {method}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {paymentMethod === 'creditCard' || paymentMethod === 'debitCard' ? (
              <div className="card-form">
                <div className={`form-group ${errors.cardNumber ? 'error' : ''}`}>
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>
                <div className={`form-group ${errors.cardName ? 'error' : ''}`}>
                  <label>Name on Card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                </div>
                <div className="form-row">
                  <div className={`form-group ${errors.expiryDate ? 'error' : ''}`}>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>
                  <div className={`form-group ${errors.cvv ? 'error' : ''}`}>
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="3"
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            ) : paymentMethod === 'upi' ? (
              <div className={`form-group ${errors.upiId ? 'error' : ''}`}>
                <label>UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="yourname@upi"
                />
                {errors.upiId && <span className="error-message">{errors.upiId}</span>}
              </div>
            ) : paymentMethod === 'netBanking' ? (
              <div className={`form-group ${errors.netBankingBank ? 'error' : ''}`}>
                <label>Select Bank</label>
                <select
                  name="netBankingBank"
                  value={formData.netBankingBank}
                  onChange={handleInputChange}
                >
                  <option value="">Select your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                </select>
                {errors.netBankingBank && <span className="error-message">{errors.netBankingBank}</span>}
              </div>
            ) : null}

            <div className="terms-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I authorize CarRental to charge my payment method for the total amount shown.
              </label>
            </div>

            <button type="submit" className="pay-now-btn" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-lock"></i> Pay ₹{calculateFinalAmount()} Now
                </>
              )}
            </button>

            <div className="security-info">
              <i className="fas fa-shield-alt"></i>
              <span>Your payment is secured with 256-bit SSL encryption</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;

