import React from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css'; 

const Navbar = () => {
  return (
    <div className="navbar">

      <div className="navbar-links">
        <Link to="/" className="navbar-title">GLIS</Link>
        <Link to="/data" className="navbar-link">Data</Link>
        <Link to="/Map" className="navbar-link">Map</Link>
        <Link to='/Agri' className='navbar-link'>Agriculture Lands</Link>
        <Link to='/Agri/add' className='navbar-link'>Add Lands</Link>
        {/* <Link to="/user" className="navbar-link">User</Link> */}
      </div>
    </div>
  );
};

export default Navbar;
