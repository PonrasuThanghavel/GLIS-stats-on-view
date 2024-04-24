const express = require('express');
const router = express.Router();
// const infoModel = require('../Model/info');
const MarketModel = require('../Model/market');

router.get('/', async (req, res) => {
    try {
      const cropsData = await MarketModel.find({});
      res.json(cropsData);
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
    res.json(marketData);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { ID, crops } = req.body;
    const marketData = new MarketModel({ ID, crops });
    await marketData.save();
    res.status(201).json({ message: 'Market data added successfully' });
  } catch (error) {
    console.error('Error adding market data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
