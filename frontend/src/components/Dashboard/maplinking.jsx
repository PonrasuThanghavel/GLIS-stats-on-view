import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './css/maplinking.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Icon } from "leaflet";

const Maplinking = () => {
  const [geocode, setGeocode] = useState([]);
  const [zoneTypes, setZoneTypes] = useState([]);
  const [filteredZone, setFilteredZone] = useState('');

  useEffect(() => {
    const fetchGeocode = async () => {
      try {
        const response = await axios.get('https://glis-backend.onrender.com/api/geocode');
        setGeocode(response.data);
        // Extracting unique zone types
        const types = response.data.map(geo => geo.Zone_type.toLowerCase());
        setZoneTypes([...new Set(types)]);
      } catch (error) {
        console.error('Error fetching geocode:', error);
      }
    };

    fetchGeocode();
  }, []);

  const customIcon = new Icon({
    iconUrl: require('../../assets/images/placeholder.png'),
    iconSize: [38, 38]
  });

  const handleFilterChange = (event) => {
    setFilteredZone(event.target.value);
  };

  const filteredGeocode = filteredZone ? geocode.filter(geo => geo.Zone_type.toLowerCase() === filteredZone.toLowerCase()) : geocode;

  return (
    <div>
      <div className="filter-container">
        <label className="filter-label" htmlFor="zoneFilter">Filter by Zone Type: </label>
        <select className="filter-control" id="zoneFilter" onChange={handleFilterChange} value={filteredZone}>
          <option value="">All ({geocode.length})</option>
          {zoneTypes.map((type, index) => (
            <option key={index} value={type}>
              {type} ({geocode.filter(geo => geo.Zone_type.toLowerCase() === type).length})
            </option>
          ))}
        </select>
      </div>
      <MapContainer center={[13.0505, 80.2241]} zoom={12}>
        <TileLayer
          attribution="mywork"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredGeocode.map((geo, index) => (
          <Marker key={index} position={[geo.lat, geo.long]} icon={customIcon}>
            <Popup>
              <div>
                <p><strong>ID:</strong> {geo.ID}</p>
                <p><strong>Name:</strong> {geo.Name}</p>
                <p><strong>Local:</strong> {geo.Local}</p>
                <p><strong>Zone Type:</strong> {geo.Zone_type}</p>
                <p><strong>Year:</strong> {geo.Year}</p>
                <p><strong>Latitude:</strong> {geo.lat}</p>
                <p><strong>Longitude:</strong> {geo.long}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Maplinking;
