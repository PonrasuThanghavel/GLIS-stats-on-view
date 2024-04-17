import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker,Popup } from "react-leaflet";
import './css/maplinking.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Icon } from "leaflet";
const Maplinking = () => {
  const [geocode, setGeocode] = useState([]);

  useEffect(() => {
    const fetchGeocode = async () => {
      try {
        const response = await axios.get('https://glis-backend.onrender.com/api/geocode');
        setGeocode(response.data);
      } catch (error) {
        console.error('Error fetching geocode:', error);
      }
    };

    fetchGeocode();
  }, []);

  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require('../../assets/images/placeholder.png'),
    iconSize: [38, 38] // size of the icon
  });
  return (
    <MapContainer center={[13.0505,80.2241]} zoom={12}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution="mywork"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geocode.map((geo, index) => (
        <Marker key={index} position={[geo.lat, geo.long] }icon={customIcon}>
          <Popup>{geo.Name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Maplinking;
