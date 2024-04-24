const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  ID: { type: Number, default: 0 }, // Set a default value for ID
  Crops: [
    {
      Name: { type: String, required: true },
      Price: { type: Number, required: true },
      Quantity: { type: Number, required: true }
    }
  ]
});

// Pre-save middleware to set a default value for ID if not provided
marketSchema.pre('save', function(next) {
  if (!this.ID) {
    this.ID = 0; // Set a default value for ID if not provided
  }
  next();
});

const MarketModel = mongoose.model('Market', marketSchema);

module.exports = MarketModel;
