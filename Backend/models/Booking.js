// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   userDetails: {
//     name: String,
//     email: String,
//     phone: String,
//     address: String,
//     aadhaar: String,
//     aadhaarFile: String
//   },
//   carDetails: {
//     name: String,
//     image: String,
//     transmission: String,
//     fuelType: String,
//     seats: Number
//   },
//   bookingDetails: {
//     startDate: String,
//     endDate: String,
//     totalDays: Number,
//     totalPrice: Number,
//     location: String
//   },
//   paymentDetails: {
//     method: String,
//     amount: Number,
//     originalAmount: Number,
//     discount: {
//       code: String,
//       amount: Number,
//       percentage: Number
//     }
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Booking', bookingSchema);





// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   userDetails: {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     aadhaar: { type: String, required: true },
//     aadhaarFile: { type: String, required: true }
//   },
//   carDetails: {
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     transmission: { type: String, required: true },
//     fuelType: { type: String, required: true },
//     seats: { type: Number, required: true }
//   },
//   bookingDetails: {
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     totalDays: { type: Number, required: true },
//     totalPrice: { type: Number, required: true },
//     location: { type: String, required: true },
//     bookingReference: { 
//       type: String, 
//       required: true,
//       unique: true,
//       default: () => `BOOK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
//     }
//   },
//   paymentDetails: {
//     method: { type: String, required: true },
//     amount: { type: Number, required: true },
//     originalAmount: { type: Number, required: true },
//     discount: {
//       code: String,
//       amount: Number,
//       percentage: Number
//     },
//     status: { type: String, default: 'pending' }
//   },
//   status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Add index for better query performance
// bookingSchema.index({ 'bookingDetails.bookingReference': 1 });
// bookingSchema.index({ 'userDetails.email': 1 });
// bookingSchema.index({ createdAt: 1 });

// module.exports = mongoose.model('Booking', bookingSchema);





// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   userDetails: {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     aadhaar: { type: String, required: true },
//     aadhaarFile: { type: String, required: true }
//   },
//   carDetails: {
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     transmission: { type: String, required: true },
//     fuelType: { type: String, required: true },
//     seats: { type: Number, required: true }
//   },
//   bookingDetails: {
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     totalDays: { type: Number, required: true },
//     totalPrice: { type: Number, required: true },
//     location: { type: String, required: true },
//     bookingReference: { 
//       type: String, 
//       required: true,
//       unique: true,
//       default: function() {
//         // More robust reference generation
//         const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();
//         const timePart = Date.now().toString(36).toUpperCase();
//         return `BOOK-${timePart}-${randomPart}`;
//       }
//     }
//   },
//   paymentDetails: {
//     method: { type: String, required: true },
//     amount: { type: Number, required: true },
//     originalAmount: { type: Number, required: true },
//     discount: {
//       code: String,
//       amount: Number,
//       percentage: Number
//     },
//     status: { type: String, default: 'pending' }
//   },
//   status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   // Add timestamps for created and updated
//   timestamps: true
// });

// // Indexes
// bookingSchema.index({ 'bookingDetails.bookingReference': 1 }, { unique: true });
// bookingSchema.index({ 'userDetails.email': 1 });
// bookingSchema.index({ createdAt: 1 });
// bookingSchema.index({ status: 1 });

// // Pre-save hook to ensure unique reference
// bookingSchema.pre('save', async function(next) {
//   if (!this.bookingDetails.bookingReference) {
//     let isUnique = false;
//     let attempts = 0;
//     const maxAttempts = 5;
    
//     while (!isUnique && attempts < maxAttempts) {
//       attempts++;
//       const randomPart = Math.random().toString(36).substr(2, 6).toUpperCase();
//       const timePart = Date.now().toString(36).toUpperCase();
//       const newRef = `BOOK-${timePart}-${randomPart}`;
      
//       try {
//         const existing = await mongoose.model('Booking').findOne({ 
//           'bookingDetails.bookingReference': newRef 
//         });
        
//         if (!existing) {
//           this.bookingDetails.bookingReference = newRef;
//           isUnique = true;
//         }
//       } catch (err) {
//         return next(err);
//       }
//     }
    
//     if (!isUnique) {
//       return next(new Error('Could not generate unique booking reference'));
//     }
//   }
//   next();
// });

// module.exports = mongoose.model('Booking', bookingSchema);



// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   bookingReference: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   userDetails: {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     aadhaar: { type: String, required: true },
//     aadhaarFile: { type: String, required: true }
//   },
//   carDetails: {
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     transmission: { type: String, required: true },
//     fuelType: { type: String, required: true },
//     seats: { type: Number, required: true }
//   },
//   bookingDetails: {
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     totalDays: { type: Number, required: true },
//     totalPrice: { type: Number, required: true },
//     location: { type: String, required: true }
//   },
//   paymentDetails: {
//     method: { type: String, required: true },
//     amount: { type: Number, required: true },
//     originalAmount: { type: Number, required: true },
//     discount: {
//       code: String,
//       amount: Number,
//       percentage: Number
//     },
//     status: { type: String, default: 'pending' }
//   },
//   status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

// // 🔁 Generate bookingReference before save
// bookingSchema.pre('save', async function (next) {
//   if (!this.bookingReference) {
//     const generateReference = () => {
//       const timestamp = Date.now().toString(36).toUpperCase();
//       const random = Math.random().toString(36).substring(2, 6).toUpperCase();
//       return `REF-${timestamp}-${random}`;
//     };

//     let isUnique = false;
//     let attempts = 0;

//     while (!isUnique && attempts < 5) {
//       const newRef = generateReference();
//       const existing = await mongoose.models.Booking.findOne({ bookingReference: newRef });
//       if (!existing) {
//         this.bookingReference = newRef;
//         isUnique = true;
//       }
//       attempts++;
//     }

//     if (!isUnique) {
//       return next(new Error('Failed to generate unique booking reference'));
//     }
//   }

//   next();
// });

// module.exports = mongoose.model('Booking', bookingSchema);






// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   userDetails: {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     aadhaar: { type: String, required: true },
//     aadhaarFile: { type: String, required: true }
//   },
//   carDetails: {
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     transmission: { type: String, required: true },
//     fuelType: { type: String, required: true },
//     seats: { type: Number, required: true }
//   },
//   bookingDetails: {
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     totalDays: { type: Number, required: true },
//     totalPrice: { type: Number, required: true },
//     location: { type: String, required: true }
//   },
//   paymentDetails: {
//     method: { type: String, required: true },
//     amount: { type: Number, required: true },
//     originalAmount: { type: Number, required: true },
//     discount: {
//       code: String,
//       amount: Number,
//       percentage: Number
//     },
//     status: { type: String, default: 'pending' }
//   },
//   status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);









const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    aadhaar: { type: String, required: true },
    aadhaarFile: { type: String, required: true }
  },
  carDetails: {
    name: { type: String, required: true },
    image: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    seats: { type: Number, required: true }
  },
  bookingDetails: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    location: { type: String, required: true }
  },
  paymentDetails: {
    method: { type: String, required: true },
    amount: { type: Number, required: true },
    originalAmount: { type: Number, required: true },
    discount: {
      code: String,
      amount: Number,
      percentage: Number
    },
    status: { type: String, default: 'pending' }
  },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
