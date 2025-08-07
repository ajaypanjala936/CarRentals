const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate, totalDays, totalPrice, paymentStatus } = req.body;

    // Check car availability
    const existingBooking = await Booking.findOne({
      car: carId,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Car is already booked for these dates' });
    }

    const booking = new Booking({
      user: req.user.id,
      car: carId,
      startDate,
      endDate,
      totalDays,
      totalPrice,
      paymentStatus
    });

    await booking.save();

    // Update car's booked status
    await Car.findByIdAndUpdate(carId, { isBooked: true });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('car', 'name model image pricePerDay')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('car', 'name model')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('car', 'name model');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if booking belongs to user or user is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update car's booked status
    await Car.findByIdAndUpdate(booking.car, { isBooked: false });

    await booking.remove();
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};