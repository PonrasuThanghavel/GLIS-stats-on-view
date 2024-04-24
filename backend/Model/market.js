const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  ID: { type: Number, required: true },
  crops: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

const MarketModel = mongoose.model('Market', marketSchema);

module.exports = MarketModel;
