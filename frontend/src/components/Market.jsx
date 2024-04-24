import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import './css/Market.css';

const Market = () => {
  const { id } = useParams();
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMarketData(id);
  }, [id]);

  const fetchMarketData = async (id) => {
    try {
      // For testing purposes, let's use the provided JSON data directly
      const testData = {
        "ID": 1,
        "crops": [
          {
            "name": "Onion",
            "quantity": 20
          },
          {
            "name": "Tomato",
            "quantity": 80
          },
          {
            "name": "Cabbage",
            "quantity": 100
          }
        ]
      };
      setMarketData(testData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching market data. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className='Market'>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <h2>Market Information for ID: {marketData.ID}</h2>
          <div className='market-details'>
            <h3>Crops Information</h3>
            <ul>
              {marketData.crops.map((crop, index) => (
                <li key={index}>{crop.name}: {crop.quantity}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
