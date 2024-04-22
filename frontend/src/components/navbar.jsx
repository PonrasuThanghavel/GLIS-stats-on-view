import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/navbar.css';
import { FaDatabase, FaMap, FaPlusCircle } from 'react-icons/fa';
import { FaLandmarkFlag } from 'react-icons/fa6';

const Navbar = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('https://glis-backend.onrender.com/api/user');
        const user = response.data;
        console.log(user);
        setUserRole(user.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-title">GLIS</Link>
        {userRole === 'governmentOfficial' && (
          <Link to="/data" className="navbar-link">
            <FaDatabase className='navbar-icon' /> Data
          </Link>
        )}
        <Link to="/Map" className="navbar-link">
          <FaMap className='navbar-icon' /> Map
        </Link>
        <Link to='/Agri' className='navbar-link'>
          <FaLandmarkFlag className='navbar-icon' /> Agriculture Lands
        </Link>
        <Link to='/Agri/add' className='navbar-link'>
          <FaPlusCircle className='navbar-icon'/> Add Lands
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
