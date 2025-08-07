

// function generateEmailTemplate(bookingData, paymentDetails, userDetails) {
//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             background-color: #f5f5f5;
//             padding: 0;
//             margin: 0;
//           }
//           .container {
//             max-width: 600px;
//             margin: 0 auto;
//             background: #ffffff;
//             border-radius: 10px;
//             overflow: hidden;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//           }
//           .header {
//             background: url('https://www.chase.com/content/dam/unified-assets/photography/articles/credit-card/basics/seo-how-to-redeem-ur-points-for-rental-cars_11292023.jpg') center/cover no-repeat;
//             color: #fff;
//             text-align: center;
//             padding: 40px 20px;
//             background-color: #007bff; /* Fallback color */
//           }
//           .header-overlay {
//             background-color: rgba(0, 0, 0, 0.5);
//             padding: 20px;
//             border-radius: 10px;
//           }
//           .content {
//             padding: 30px 20px;
//           }
//           .section {
//             margin-bottom: 25px;
//           }
//           .section h3 {
//             border-bottom: 2px solid #007bff;
//             padding-bottom: 5px;
//             margin-bottom: 15px;
//             color: #007bff;
//           }
//           .detail-item {
//             margin-bottom: 10px;
//             font-size: 15px;
//           }
//           .total {
//             font-weight: bold;
//             font-size: 18px;
//             margin-top: 10px;
//           }
//           .footer {
//             text-align: center;
//             font-size: 12px;
//             color: #888;
//             padding: 20px;
//             background-color: #f0f0f0;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <div class="header-overlay">
//               <h2>Your Booking is Confirmed!</h2>
//             </div>
//           </div>
  
//           <div class="content">
//             <div class="section user-details">
//               <h3>Customer Information</h3>
//               <div class="detail-item"><strong>Name:</strong> ${userDetails.name}</div>
//               <div class="detail-item"><strong>Email:</strong> ${userDetails.email}</div>
//               <div class="detail-item"><strong>Phone:</strong> ${userDetails.phone}</div>
//               <div class="detail-item"><strong>Address:</strong> ${userDetails.address}</div>
//               <div class="detail-item"><strong>Aadhaar:</strong> ${userDetails.aadhaar}</div>
//             </div>
  
//             <div class="section booking-details">
//               <h3>Booking Details</h3>
//               <div class="detail-item"><strong>Car Model:</strong> ${bookingData.carDetails.name}</div>
//               <div class="detail-item"><strong>Rental Period:</strong> ${bookingData.bookingDetails.totalDays} days</div>
//               <div class="detail-item"><strong>Pickup Date:</strong> ${bookingData.bookingDetails.startDate}</div>
//               <div class="detail-item"><strong>Return Date:</strong> ${bookingData.bookingDetails.endDate}</div>
//               <div class="detail-item"><strong>Location:</strong> ${bookingData.bookingDetails.location || bookingData.location}</div>
//             </div>
  
//             <div class="section payment-details">
//               <h3>Payment Details</h3>
//               <div class="detail-item"><strong>Payment Method:</strong> ${paymentDetails.method}</div>
//               <div class="detail-item"><strong>Original Amount:</strong> ₹${paymentDetails.originalAmount}</div>
//               ${paymentDetails.discount ? 
//                 `<div class="detail-item"><strong>Discount Applied (${paymentDetails.discount.percentage}%):</strong> -₹${paymentDetails.discount.amount}</div>` : ''}
//               <div class="detail-item total"><strong>Total Paid:</strong> ₹${paymentDetails.amount}</div>
//             </div>
  
//             <p>Thank you for choosing our service. Your vehicle will be ready for pickup as scheduled.</p>
//           </div>
  
//           <div class="footer">
//             <p>If you have any questions, please contact our customer support.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
//   }
  
//   module.exports = generateEmailTemplate;
  



function generateEmailTemplate(bookingData, paymentDetails, userDetails) {
    // Construct the car image URL
    const carImageUrl = bookingData.carDetails.image 
        ? `http://localhost:5000/uploads/${bookingData.carDetails.image}`
        : "https://via.placeholder.com/300x150?text=Car+Image";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f5f5f5;
            padding: 0;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .header {
            background: url('https://www.chase.com/content/dam/unified-assets/photography/articles/credit-card/basics/seo-how-to-redeem-ur-points-for-rental-cars_11292023.jpg') center/cover no-repeat;
            color: #fff;
            text-align: center;
            padding: 40px 20px;
            background-color: #007bff; /* Fallback color */
          }
          .header-overlay {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 10px;
          }
          .content {
            padding: 30px 20px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section h3 {
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
            margin-bottom: 15px;
            color: #007bff;
          }
          .detail-item {
            margin-bottom: 10px;
            font-size: 15px;
          }
          .car-image {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 15px 0;
            border: 1px solid #ddd;
          }
          .total {
            font-weight: bold;
            font-size: 18px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            padding: 20px;
            background-color: #f0f0f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-overlay">
              <h2>Your Booking is Confirmed!</h2>
            </div>
          </div>
  
          <div class="content">
            <div class="section user-details">
              <h3>Customer Information</h3>
              <div class="detail-item"><strong>Name:</strong> ${userDetails.name}</div>
              <div class="detail-item"><strong>Email:</strong> ${userDetails.email}</div>
              <div class="detail-item"><strong>Phone:</strong> ${userDetails.phone}</div>
              <div class="detail-item"><strong>Address:</strong> ${userDetails.address}</div>
              <div class="detail-item"><strong>Aadhaar:</strong> ${userDetails.aadhaar}</div>
            </div>
  
            <div class="section booking-details">
              <h3>Booking Details</h3>
              <div class="detail-item"><strong>Car Model:</strong> ${bookingData.carDetails.name}</div>
              <img src="${carImageUrl}" alt="${bookingData.carDetails.name}" class="car-image" onerror="this.src='https://via.placeholder.com/300x150?text=Car+Image'">
              <div class="detail-item"><strong>Rental Period:</strong> ${bookingData.bookingDetails.totalDays} days</div>
              <div class="detail-item"><strong>Pickup Date:</strong> ${bookingData.bookingDetails.startDate}</div>
              <div class="detail-item"><strong>Return Date:</strong> ${bookingData.bookingDetails.endDate}</div>
              <div class="detail-item"><strong>Location:</strong> ${bookingData.bookingDetails.location || bookingData.location}</div>
            </div>
  
            <div class="section payment-details">
              <h3>Payment Details</h3>
              <div class="detail-item"><strong>Payment Method:</strong> ${paymentDetails.method}</div>
              <div class="detail-item"><strong>Original Amount:</strong> ₹${paymentDetails.originalAmount}</div>
              ${paymentDetails.discount ? 
                `<div class="detail-item"><strong>Discount Applied (${paymentDetails.discount.percentage}%):</strong> -₹${paymentDetails.discount.amount}</div>` : ''}
              <div class="detail-item total"><strong>Total Paid:</strong> ₹${paymentDetails.amount}</div>
            </div>
  
            <p>Thank you for choosing our service. Your vehicle will be ready for pickup as scheduled.</p>
          </div>
  
          <div class="footer">
            <p>If you have any questions, please contact our customer support.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
module.exports = generateEmailTemplate;