// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
// const path = require('path');
// const fs = require('fs');
// const nodemailer = require('nodemailer');
// const generateEmailTemplate = require('./utils/emailTemplate');

// const app = express();

// // ======================
// // Configuration
// // ======================
// const PORT = process.env.PORT || 5001; // Changed from 5000 to avoid conflicts
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carrental';
// const UPLOADS_DIR = path.join(__dirname, 'uploads');
// const isProduction = process.env.NODE_ENV === 'production';

// // ======================
// // Security Middleware
// // ======================
// app.use(helmet());
// app.use(cors({ 
//   origin: process.env.CLIENT_URL || 'http://localhost:3000',
//   credentials: true
// }));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: isProduction ? 100 : 1000, // More lenient in development
//   message: 'Too many requests from this IP, please try again later'
// });
// app.use(limiter);

// // ======================
// // Request Processing
// // ======================
// app.use(morgan(isProduction ? 'combined' : 'dev'));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Request Logger Middleware
// app.use((req, res, next) => {
//   if (!isProduction) {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   }
//   next();
// });

// // ======================
// // Database Connection
// // ======================
// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       serverSelectionTimeoutMS: 5000,
//       retryWrites: true,
//       w: 'majority'
//     });
//     console.log('✅ MongoDB Connected');
//   } catch (err) {
//     console.error('❌ MongoDB Connection Error:', err);
//     process.exit(1);
//   }
// };
// connectDB();

// // ======================
// // File Handling
// // ======================
// if (!fs.existsSync(UPLOADS_DIR)) {
//   fs.mkdirSync(UPLOADS_DIR, { recursive: true });
// }

// app.use('/uploads', express.static(UPLOADS_DIR, {
//   setHeaders: (res, filePath) => {
//     res.set('Cache-Control', 'public, max-age=86400'); // 1 day cache
//     if (!isProduction) {
//       console.log(`Serving file: ${filePath}`);
//     }
//   }
// }));

// // ======================
// // Email Configuration
// // ======================
// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE || 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
//   pool: true,
//   rateLimit: true,
//   maxConnections: 1,
//   maxMessages: 5
// });

// // ======================
// // API Routes
// // ======================
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/cars', require('./routes/carRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));

// // ======================
// // Email Confirmation Endpoint
// // ======================
// app.post('/api/send-confirmation-email', async (req, res) => {
//   const requiredFields = ['email', 'userDetails', 'bookingData', 'paymentDetails'];
//   const missingFields = requiredFields.filter(field => !req.body[field]);

//   if (missingFields.length > 0) {
//     return res.status(400).json({ 
//       success: false,
//       error: 'Missing required fields',
//       missingFields
//     });
//   }

//   const { email, userDetails, bookingData, paymentDetails } = req.body;

//   try {
//     const emailHTML = generateEmailTemplate(bookingData, paymentDetails, userDetails);
    
//     const mailOptions = {
//       from: `"Car Rental" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Your Car Rental Booking Confirmation',
//       html: emailHTML,
//       priority: 'high'
//     };

//     await transporter.sendMail(mailOptions);
    
//     res.status(200).json({ 
//       success: true,
//       message: 'Confirmation email sent successfully'
//     });
//   } catch (error) {
//     console.error('❌ Email sending error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: 'Failed to send confirmation email',
//       ...(!isProduction && { details: error.message })
//     });
//   }
// });

// // ======================
// // Health Check
// // ======================
// app.get('/api/health', (req, res) => {
//   const healthCheck = {
//     status: 'OK',
//     timestamp: new Date(),
//     database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     emailService: transporter ? 'Configured' : 'Not Configured',
//     uptime: process.uptime(),
//     memoryUsage: process.memoryUsage()
//   };
//   res.json(healthCheck);
// });

// // ======================
// // Error Handling
// // ======================
// app.use((req, res) => {
//   res.status(404).json({ 
//     success: false,
//     message: 'Route not found',
//     availableEndpoints: [
//       '/api/health',
//       '/api/auth',
//       '/api/cars',
//       '/api/users',
//       '/api/bookings',
//       '/api/send-confirmation-email'
//     ]
//   });
// });

// app.use((err, req, res, next) => {
//   console.error('❌ Server Error:', err);
//   res.status(500).json({ 
//     success: false,
//     message: 'Internal Server Error',
//     ...(!isProduction && { stack: err.stack })
//   });
// });

// // ======================
// // Server Initialization
// // ======================
// const server = app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📁 Serving static files from ${UPLOADS_DIR}`);
//   console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// // ======================
// // Process Management
// // ======================
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
//   server.close(() => process.exit(1));
// });

// process.on('SIGTERM', () => {
//   console.log('SIGTERM received. Shutting down gracefully');
//   server.close(() => {
//     console.log('Process terminated');
//   });
// });



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const generateEmailTemplate = require('./utils/emailTemplate');

const app = express();

// ======================
// Security Middleware
// ======================
app.use(helmet());
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logger
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// ======================
// Database Connection
// ======================

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carrental', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// ======================
// File Handling
// ======================
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, path) => {
    res.set('Cache-Control', 'no-store, max-age=0');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    if (process.env.NODE_ENV === 'development') {
      console.log(`Serving static file: ${path}`);
    }
  }
}));

// ======================
// Email Configuration
// ======================
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ======================
// API Routes
// ======================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes')); // 📌 Add bookings route

// ======================
// Email Confirmation Endpoint
// ======================
app.post('/api/send-confirmation-email', async (req, res) => {
  try {
    const { email, userDetails, bookingData, paymentDetails } = req.body;

    const missingFields = [];
    if (!email) missingFields.push('email');
    if (!userDetails) missingFields.push('userDetails');
    if (!bookingData) missingFields.push('bookingData');
    if (!paymentDetails) missingFields.push('paymentDetails');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields',
        missingFields
      });
    }

    if (!userDetails.name || !userDetails.email) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user details'
      });
    }

    if (!bookingData.carDetails || !bookingData.bookingDetails) {
      return res.status(400).json({
        success: false,
        error: 'Invalid booking data'
      });
    }

    const emailHTML = generateEmailTemplate(bookingData, paymentDetails, userDetails);

    const mailOptions = {
      from: `"Car Rental" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Car Rental Booking Confirmation',
      html: emailHTML
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true,
      message: 'Confirmation email sent successfully'
    });
  } catch (error) {
    console.error('❌ Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send confirmation email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ======================
// Health Check
// ======================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    emailService: transporter ? 'Configured' : 'Not Configured',
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  });
});

// ======================
// Error Handling
// ======================
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    availableEndpoints: [
      '/api/health',
      '/api/auth',
      '/api/cars',
      '/api/users',
      '/api/bookings',
      '/api/send-confirmation-email'
    ]
  });
});

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from ${uploadsDir}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
});

// ======================
// Handle Unhandled Rejections
// ======================
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});












// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const morgan = require('morgan');
// const path = require('path');
// const fs = require('fs');
// const multer = require('multer'); // Added for file uploads
// const nodemailer = require('nodemailer');
// const generateEmailTemplate = require('./utils/emailTemplate');

// const app = express();

// // ======================
// // Configuration
// // ======================
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carrental';
// const UPLOADS_DIR = path.join(__dirname, 'uploads');
// const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// // ======================
// // Security Middleware
// // ======================
// app.use(helmet());
// app.use(cors({ 
//   origin: CLIENT_URL,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: 'Too many requests from this IP, please try again later'
// });
// app.use(limiter);

// // ======================
// // Logging Middleware
// // ======================
// app.use(morgan('dev'));
// app.use((req, res, next) => {
//   console.log(`Incoming ${req.method} request to ${req.url} from ${req.ip}`);
//   next();
// });

// // ======================
// // Body Parsing
// // ======================
// app.use(express.json({ limit: '50mb' })); // Increased limit for file uploads
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// // ======================
// // Database Connection
// // ======================
// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000
//     });
//     console.log('✅ MongoDB Connected');
//   } catch (err) {
//     console.error('❌ MongoDB Connection Error:', err);
//     process.exit(1);
//   }
// };

// connectDB();

// // ======================
// // File Upload Configuration
// // ======================
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, UPLOADS_DIR);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif|webp|pdf/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase();
//     const mimetype = filetypes.test(file.mimetype);
    
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only images (jpeg, jpg, png, gif, webp) and PDFs are allowed'));
//     }
//   }
// });

// // ======================
// // File Handling Setup
// // ======================
// const setupUploadsDir = () => {
//   if (!fs.existsSync(UPLOADS_DIR)) {
//     fs.mkdirSync(UPLOADS_DIR, { recursive: true });
//     console.log(`📁 Created uploads directory at ${UPLOADS_DIR}`);
//   }
// };

// setupUploadsDir();

// app.use('/uploads', express.static(UPLOADS_DIR, {
//   setHeaders: (res, filePath) => {
//     res.set('Cache-Control', 'public, max-age=3600');
//     if (process.env.NODE_ENV === 'development') {
//       console.log(`📤 Serving static file: ${filePath}`);
//     }
//   }
// }));

// // ======================
// // Email Service Setup
// // ======================
// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE || 'gmail',
//   pool: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// transporter.verify((error) => {
//   if (error) {
//     console.error('❌ Email service configuration error:', error);
//   } else {
//     console.log('📧 Email service ready');
//   }
// });

// // ======================
// // API Routes
// // ======================
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/cars', require('./routes/carRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));

// // ======================
// // File Upload Endpoint
// // ======================
// app.post('/api/upload', upload.single('file'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         error: 'No file uploaded'
//       });
//     }

//     const fileUrl = `/uploads/${req.file.filename}`;
    
//     res.status(200).json({
//       success: true,
//       message: 'File uploaded successfully',
//       filePath: fileUrl,
//       fileName: req.file.filename
//     });
//   } catch (error) {
//     console.error('❌ File upload error:', error);
//     res.status(500).json({
//       success: false,
//       error: error.message || 'Failed to upload file'
//     });
//   }
// });

// // ======================
// // Email Confirmation Endpoint
// // ======================
// app.post('/api/send-confirmation-email', async (req, res) => {
//   try {
//     const { email, userDetails, bookingData, paymentDetails } = req.body;

//     // Input validation
//     if (!email || !userDetails?.name || !bookingData?.carDetails || !paymentDetails?.amount) {
//       return res.status(400).json({
//         success: false,
//         error: 'Missing required fields',
//         requiredFields: {
//           email: 'string',
//           userDetails: { name: 'string' },
//           bookingData: { carDetails: 'object' },
//           paymentDetails: { amount: 'number' }
//         }
//       });
//     }

//     // Generate email content
//     const emailHTML = generateEmailTemplate(bookingData, paymentDetails, userDetails);

//     // Send email
//     const info = await transporter.sendMail({
//       from: `"Car Rental Service" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Your Car Rental Booking Confirmation',
//       html: emailHTML,
//       attachments: userDetails.aadhaarFile ? [{
//         filename: 'aadhaar.pdf',
//         path: path.join(UPLOADS_DIR, userDetails.aadhaarFile)
//       }] : []
//     });

//     console.log(`📨 Email sent to ${email}: ${info.messageId}`);

//     res.status(200).json({ 
//       success: true,
//       message: 'Confirmation email sent successfully',
//       messageId: info.messageId
//     });
//   } catch (error) {
//     console.error('❌ Email sending error:', error);
//     res.status(500).json({ 
//       success: false, 
//       error: 'Failed to send confirmation email',
//       ...(process.env.NODE_ENV === 'development' && { details: error.message })
//     });
//   }
// });

// // ======================
// // Health Check Endpoint
// // ======================
// app.get('/api/health', (req, res) => {
//   const status = {
//     status: 'OK',
//     uptime: process.uptime(),
//     database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     emailService: transporter ? 'Ready' : 'Not Configured',
//     environment: process.env.NODE_ENV || 'development',
//     memoryUsage: process.memoryUsage(),
//     lastCron: new Date().toISOString(),
//     uploadsDirectory: {
//       exists: fs.existsSync(UPLOADS_DIR),
//       path: UPLOADS_DIR,
//       files: fs.readdirSync(UPLOADS_DIR).length
//     }
//   };
//   res.json(status);
// });

// // ======================
// // Error Handling
// // ======================
// app.use((req, res) => {
//   res.status(404).json({ 
//     success: false,
//     message: 'Route not found',
//     availableEndpoints: [
//       '/api/health',
//       '/api/auth',
//       '/api/cars',
//       '/api/users',
//       '/api/bookings',
//       '/api/upload',
//       '/api/send-confirmation-email'
//     ],
//     documentation: `${CLIENT_URL}/api-docs`
//   });
// });

// app.use((err, req, res, next) => {
//   console.error('❌ Server Error:', err);
//   res.status(err.status || 500).json({ 
//     success: false,
//     message: err.message || 'Internal Server Error',
//     ...(process.env.NODE_ENV === 'development' && { 
//       stack: err.stack,
//       fullError: err 
//     })
//   });
// });

// // ======================
// // Server Initialization
// // ======================
// const server = app.listen(PORT, () => {
//   console.log(`\n🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📁 Serving static files from ${UPLOADS_DIR}`);
//   console.log(`🌐 Allowed CORS origin: ${CLIENT_URL}`);
//   console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}\n`);
// });

// // ======================
// // Process Handlers
// // ======================
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
//   server.close(() => process.exit(1));
// });

// process.on('SIGTERM', () => {
//   console.log('SIGTERM received. Shutting down gracefully...');
//   server.close(() => {
//     mongoose.connection.close(false, () => {
//       console.log('MongoDB connection closed');
//       process.exit(0);
//     });
//   });
// });