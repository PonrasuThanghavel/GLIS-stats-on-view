const express = require('express');
const router = express.Router();
const BusStation = require('../Model/info.js');

// Get lat and long and name
router.get('/', async (req, res) => {
  try {
    const geocode = await BusStation.find({}).select('Name lat long');
    res.json(geocode);
  } catch (error) {
    console.error('Error fetching geocode:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
