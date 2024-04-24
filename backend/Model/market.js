const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  ID: { type: Number },
  Crops: [
    {
      Name: { type: String, required: true },
      Price: {type: Number, required: true},
      Quantity: { type: Number, required: true }
    }
  ]
});

const MarketModel = mongoose.model('Market', marketSchema);

module.exports = MarketModel;
