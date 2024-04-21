const express = require('express');
const router = express.Router();
const DataModel = require('../Model/info.js');

// Get all details for geocode
router.get('/', async (req, res) => {
  try {
    const geocode = await DataModel.find({});
    res.json(geocode);
  } catch (error) {
    console.error('Error fetching geocode:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;