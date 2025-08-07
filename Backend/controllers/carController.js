const Car = require('../models/Car');

// Get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single car
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create car (admin only)
exports.createCar = async (req, res) => {
  try {
    const { name, model, year, transmission, fuelType, seats, pricePerDay, image } = req.body;

    const car = new Car({
      name,
      model,
      year,
      transmission,
      fuelType,
      seats,
      pricePerDay,
      image
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update car (admin only)
exports.updateCar = async (req, res) => {
  try {
    const { name, model, year, transmission, fuelType, seats, pricePerDay, image } = req.body;

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { name, model, year, transmission, fuelType, seats, pricePerDay, image },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete car (admin only)
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};