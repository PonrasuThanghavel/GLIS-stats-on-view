import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Lin

import './css/tableview.css'

const TableView = () => {
  const [busStations, setBusStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    fetchBusStations();
  }, []);

  const fetchBusStations = async () => {
    try {
      const response = await axios.get('https://glis-backend.onrender.com/api/bus-stations');
      setBusStations(response.data);
    } catch (error) {
      console.error('Error fetching bus stations:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortType(event.target.value);
  };

  // Filter
  const filteredBusStations = busStations.filter((station) =>
    station.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  const sortedBusStations = filteredBusStations.sort((a, b) => {
    if (sortType === 'ID') {
      return a.ID - b.ID;
    } else if (sortType === 'Name') {
      return a.Name.localeCompare(b.Name);
    } else if (sortType === 'Reg') {
      return a.Reg.localeCompare(b.Reg);
    } else if (sortType === 'Year') {
      return a.Year - b.Year;
    }
    return 0;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={sortType} onChange={handleSort}>
        <option value="">Sort by...</option>
        <option value="ID">ID</option>
        <option value="Name">Name</option>
        <option value="Reg">Region</option>
        <option value="Year">Year</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location Body</th>
            <th>Region</th>
            <th>Revenue</th>
            <th>Commercial Zone</th>
            <th>Year</th>
            <th>Details</th> {/* Additional column for details */}
          </tr>
        </thead>
        <tbody>
          {sortedBusStations.map((station) => (
            <tr key={station.ID}>
              <td>{station.ID}</td>
              <td>{station.Name}</td>
              <td>{station.Local }</td>
              <td>{station.Reg}</td>
              <td>{station.Rev}</td>
              <td>{station.Zone_type}</td>
              <td>{station.Year}</td>
              {/* <Recordview id={station.ID} /> */}
              <td>
                {/* Pass ID to Recordview component */}
                <Link to={`/RecordView/${station.ID}`}>more</Link>

              </td>
            </tr>
           
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
