// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // Create new booking
// router.post('/create', async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     const saved = await newBooking.save();
//     res.status(201).json({ message: 'Booking created successfully', booking: saved });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ error: 'Failed to create booking' });
//   }
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // Create new booking
// router.post('/create', async (req, res) => {
//   try {
//     // Validate required fields
//     if (!req.body.userDetails || !req.body.carDetails || !req.body.bookingDetails || !req.body.paymentDetails) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Create booking with automatic reference generation
//     const newBooking = new Booking({
//       userDetails: req.body.userDetails,
//       carDetails: req.body.carDetails,
//       bookingDetails: {
//         ...req.body.bookingDetails,
//         startDate: new Date(req.body.bookingDetails.startDate),
//         endDate: new Date(req.body.bookingDetails.endDate)
//       },
//       paymentDetails: req.body.paymentDetails
//     });

//     // Save to database
//     const savedBooking = await newBooking.save();
    
//     // Return success response
//     res.status(201).json({
//       success: true,
//       message: 'Booking created successfully',
//       booking: savedBooking,
//       bookingReference: savedBooking.bookingDetails.bookingReference
//     });

//   } catch (error) {
//     console.error('Error creating booking:', error);
    
//     // Handle specific MongoDB errors
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ 
//         error: 'Validation failed',
//         details: error.errors 
//       });
//     }
    
//     if (error.code === 11000) {
//       return res.status(409).json({ 
//         error: 'Duplicate booking reference',
//         message: 'Please try again'
//       });
//     }
    
//     res.status(500).json({ 
//       error: 'Internal server error',
//       message: 'Failed to create booking'
//     });
//   }
// });

// // Get booking by reference
// router.get('/:reference', async (req, res) => {
//   try {
//     const booking = await Booking.findOne({ 
//       'bookingDetails.bookingReference': req.params.reference 
//     });
    
//     if (!booking) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
    
//     res.json(booking);
//   } catch (error) {
//     console.error('Error fetching booking:', error);
//     res.status(500).json({ error: 'Failed to fetch booking' });
//   }
// });

// module.exports = router;







// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // Create new booking
// router.post('/create', async (req, res) => {
//   try {
//     // Validate required fields
//     const requiredFields = [
//       'userDetails', 'carDetails', 'bookingDetails', 'paymentDetails'
//     ];
    
//     for (const field of requiredFields) {
//       if (!req.body[field]) {
//         return res.status(400).json({ 
//           error: `Missing required field: ${field}` 
//         });
//       }
//     }

//     // Create new booking - let the pre-save hook generate the reference
//     const newBooking = new Booking({
//       userDetails: req.body.userDetails,
//       carDetails: req.body.carDetails,
//       bookingDetails: {
//         ...req.body.bookingDetails,
//         startDate: new Date(req.body.bookingDetails.startDate),
//         endDate: new Date(req.body.bookingDetails.endDate),
//         bookingReference: undefined // Let the hook generate this
//       },
//       paymentDetails: req.body.paymentDetails
//     });

//     // Save to database
//     const savedBooking = await newBooking.save();
    
//     // Return success response
//     res.status(201).json({
//       success: true,
//       message: 'Booking created successfully',
//       booking: savedBooking.toObject(),
//       bookingReference: savedBooking.bookingDetails.bookingReference
//     });

//   } catch (error) {
//     console.error('Error creating booking:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ 
//         error: 'Validation failed',
//         details: errors 
//       });
//     }
    
//     if (error.code === 11000) {
//       return res.status(409).json({ 
//         error: 'Duplicate booking reference',
//         message: 'Please try again or contact support'
//       });
//     }
    
//     res.status(500).json({ 
//       error: 'Internal server error',
//       message: error.message || 'Failed to create booking'
//     });
//   }
// });

// // Get booking by reference
// router.get('/:reference', async (req, res) => {
//   try {
//     const booking = await Booking.findOne({ 
//       'bookingDetails.bookingReference': req.params.reference 
//     }).lean();
    
//     if (!booking) {
//       return res.status(404).json({ 
//         error: 'Booking not found',
//         message: 'No booking found with that reference number'
//       });
//     }
    
//     res.json(booking);
//   } catch (error) {
//     console.error('Error fetching booking:', error);
//     res.status(500).json({ 
//       error: 'Failed to fetch booking',
//       message: 'An error occurred while retrieving the booking'
//     });
//   }
// });

// module.exports = router;











// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // Create new booking
// const shortid = require('shortid'); // At the top

// router.post('/create', async (req, res) => {
//   try {
//     const reference = `REF-${shortid.generate().toUpperCase()}`;

//     const newBooking = new Booking({
//       userDetails: req.body.userDetails,
//       carDetails: req.body.carDetails,
//       bookingDetails: {
//         ...req.body.bookingDetails,
//         startDate: new Date(req.body.bookingDetails.startDate),
//         endDate: new Date(req.body.bookingDetails.endDate)
//       },
//       paymentDetails: req.body.paymentDetails
//     });
    

//     console.log("Booking object before save:", newBooking);
    
//     const savedBooking = await newBooking.save();

//     res.status(201).json({
//       success: true,
//       message: 'Booking created successfully',
//       booking: savedBooking,
//       bookingReference: reference
//     });
//   } catch (error) {
//     console.error("FULL ERROR OBJECT:", error);
//     if (error.name === 'ValidationError') {
//       const details = Object.entries(error.errors).map(([field, err]) => ({
//         field,
//         message: err.message,
//         value: err.value
//       }));
//       console.error("DETAILED VALIDATION ERRORS:", details);
//       return res.status(400).json({ error: 'Validation failed', details });
//     }

//     if (error.code === 11000) {
//       return res.status(409).json({
//         error: 'Duplicate booking reference',
//         message: 'Please try again'
//       });
//     }

//     res.status(500).json({
//       error: 'Internal server error',
//       message: 'Failed to create booking'
//     });
//   }
// });
// // Get booking by reference
// router.get('/:reference', async (req, res) => {
//   try {
//     const booking = await Booking.findOne({ 
//       'bookingDetails.bookingReference': req.params.reference 
//     }).lean();
    
//     if (!booking) {
//       return res.status(404).json({ 
//         error: 'Booking not found',
//         message: 'No booking found with that reference number'
//       });
//     }
    
//     res.json(booking);
//   } catch (error) {
//     console.error('Error fetching booking:', error);
//     res.status(500).json({ 
//       error: 'Failed to fetch booking',
//       message: 'An error occurred while retrieving the booking'
//     });
//   }
// });

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // Create a new booking
// router.post('/create', async (req, res) => {
//   try {
//     const { userDetails, carDetails, bookingDetails, paymentDetails } = req.body;

//     if (!userDetails || !carDetails || !bookingDetails || !paymentDetails) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const newBooking = new Booking({
//       userDetails,
//       carDetails,
//       bookingDetails,
//       paymentDetails
//     });

//     const savedBooking = await newBooking.save();

//     res.status(201).json({
//       success: true,
//       message: 'Booking created successfully',
//       booking: savedBooking
//     });
//   } catch (error) {
//     console.error('❌ Error saving booking:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create booking',
//       error: error.message
//     });
//   }
// });

// // Get all bookings (optional for admin)
// router.get('/', async (req, res) => {
//   try {
//     const bookings = await Booking.find().sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings/create
router.post('/create', async (req, res) => {
  try {
    const { userDetails, carDetails, bookingDetails, paymentDetails } = req.body;

    if (!userDetails || !carDetails || !bookingDetails || !paymentDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBooking = new Booking({
      userDetails,
      carDetails,
      bookingDetails: {
        ...bookingDetails,
        startDate: new Date(bookingDetails.startDate),
        endDate: new Date(bookingDetails.endDate)
      },
      paymentDetails
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: savedBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create booking'
    });
  }
});

module.exports = router;
