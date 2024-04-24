// Backend routes

const express = require('express');
const router = express.Router();
const MarketModel = require('../Model/market');

router.use(express.json()); // Middleware to parse JSON requests

router.get('/', async (req, res) => {
    try {
      const marketsData = await MarketModel.find({});
      res.json(marketsData);
    } catch (error) {
      console.error('Error fetching crops data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const marketData = await MarketModel.findOne({ ID: id });
    if (!marketData) {
      return res.status(404).json({ message: 'Market data not found for this ID.' });
    }
    return res.json(marketData);
  } 
  catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/:id/crops', async (req, res) => {
  const { id } = req.params;
  const { Name, Quantity, Price } = req.body; // Ensure consistency in property names
  try {
    let marketData = await MarketModel.findOne({ ID: id });
    if (!marketData) {
      return res.status(404).json({ message: 'Market data not found for this ID.' });
    }
    marketData.Crops.push({ Name, Quantity, Price }); // Update property names
    await marketData.save();
    res.status(201).json(marketData);
  } catch (error) {
    console.error('Error adding crop:', error);
    res.status(500).json({ message: 'Error adding crop to the database.' });
  }
});

router.delete('/:id/crops/:cropId', async (req, res) => {
  const { id, cropId } = req.params;
  try {
    const marketData = await MarketModel.findOne({ ID: id });
    if (!marketData) {
      return res.status(404).json({ message: 'Market data not found for this ID.' });
    }
    const cropIndex = marketData.Crops.findIndex(crop => crop._id == cropId); // Update property name
    if (cropIndex === -1) {
      return res.status(404).json({ message: 'Crop not found in market data.' });
    }
    marketData.Crops.splice(cropIndex, 1);
    await marketData.save();
    res.json({ message: 'Crop deleted successfully.' });
  } catch (error) {
    console.error('Error deleting crop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
