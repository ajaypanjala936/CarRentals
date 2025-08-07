

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  seats: { type: Number, required: true },
  fuel: { type: String, required: true },
  location: { type: String, required: true },
  features: { type: [String], default: [] },
  transmission: { type: String, required: true, enum: ['Automatic', 'Manual'] }
});

module.exports = mongoose.model('Car', carSchema);




