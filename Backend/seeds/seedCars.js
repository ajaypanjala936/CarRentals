

require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('../models/Car');
const path = require('path');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    const cars = [
      { 
        name: "Tesla Model 3", 
        image: "Tesla-Model-3-No-Background.png",
        price: 5000, 
        seats: 5, 
        fuel: "Electric", 
        location: "Hyderabad", 
        features: ["Autopilot", "Premium Sound"], 
        transmission: "Automatic" 
      },
      { 
        name: "Toyota Camry", 
        image: "camry_010_s.jpg",
        price: 3000, 
        seats: 5, 
        fuel: "Petrol", 
        location: "Hyderabad", 
        features: ["Sunroof", "Leather Seats"], 
        transmission: "Automatic" 
      },
      { 
        name: "Hyundai Creta", 
        image: "hyundai certa.jpg",
        price: 3500, 
        seats: 5, 
        fuel: "Diesel", 
        location: "Hyderabad",
        features: ["Touchscreen", "Rear Camera", "Automatic AC"],
        transmission: "Automatic" 
      },
      { 
        name: "Thar Mahindra", 
        image: "thar.webp1.png",
        price: 4000, 
        seats: 5, 
        fuel: "Diesel", 
        location: "Hyderabad",
        features: ["4WD", "Off-road Mode", "Alloy Wheels"],
        transmission: "Manual" 
      },
      { 
        name: "Suzuki Dzire", 
        image: "swift.webp", 
        price: 2500, 
        seats: 5, 
        fuel: "Petrol", 
        location: "Hyderabad",
        features: ["Bluetooth", "Power Windows", "Airbags"],
        transmission: "Automatic" 
      },
      { 
        name: "Tesla Model 3", 
        image: "Tesla-Model-3-No-Background.png",
        price: 5000, 
        seats: 5, 
        fuel: "Electric", 
        location: "Bangalore",
        features: ["Autopilot", "Premium Sound", "Keyless Entry"],
        transmission: "Automatic" 
      },
      { 
        name: "Toyota Camry", 
        image: "camry_010_s.jpg",  
        price: 3000, 
        seats: 5, 
        fuel: "Petrol", 
        location: "Bangalore",
        features: ["Sunroof", "Navigation", "Leather Seats"],
        transmission: "Automatic" 
      },
      { 
        name: "Hyundai Creta", 
        image: "hyundai certa.jpg",
        price: 3500, 
        seats: 5, 
        fuel: "Diesel", 
        location: "Bangalore",
        features: ["Touchscreen", "Rear Camera", "Automatic AC"],
        transmission: "Automatic" 
      },
      { 
        name: "Thar Mahindra", 
        image: "thar.webp1.png",
        price: 4000, 
        seats: 5, 
        fuel: "Diesel", 
        location: "Bangalore",
        features: ["4WD", "Off-road Mode", "Alloy Wheels"],
        transmission: "Manual" 
      },
      { 
        name: "Suzuki Dzire", 
        image: "swift.webp",
        price: 2500, 
        seats: 5, 
        fuel: "Petrol", 
        location: "Bangalore",
        features: ["Bluetooth", "Power Windows", "Airbags"],
        transmission: "Automatic" 
      }
    ];

    await Car.deleteMany({});
    console.log('🗑️ Old cars removed');

    await Car.insertMany(cars);
    console.log(`🚗 ${cars.length} cars added successfully!`);

    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  });