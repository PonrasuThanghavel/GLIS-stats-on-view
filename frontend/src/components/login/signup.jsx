import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './css/signup.css'; // Assuming the CSS file path is correct

const SignUp = () => {
  const [formState, setFormState] = useState({
    Usr_name: '',
    Usr_email: '',
    Usr_phone: '',
    Usr_address: '',
    Usr_pass: '',
    confirmPassword: '',
    role: '', // New state for role selection
  });
  const [error, setError] = useState(null);
  const navigate =useNavigate();
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Additional validation
    if (!formState.role) {
      setError('Please select a role');
      return;
    }

    if (formState.Usr_pass!== formState.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Remove confirmPassword before sending the request
    const { confirmPassword, ...formData } = formState;

    try {
      console.log(formData);
      const response = await axios.post('https://glis-backend.onrender.com/api/user/add', formData);
      console.log(formData);
      console.log('Response from server:', response.data);
      navigate('/login');
    } catch (error) {
      setError('Failed to sign up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="Usr_name"
            value={formState.Usr_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Usr_email"
            value={formState.Usr_email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="Usr_phone"
            value={formState.Usr_phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Usr_address"
            value={formState.Usr_address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="Usr_pass"
            value={formState.Usr_pass}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Select Role:</label>
          <select name="role" value={formState.role} onChange={handleChange}>
            <option value="">Select</option>
            <option value="farmer">Farmer</option>
            <option value="governmentOfficial">Government Official</option>
          </select>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
};

export default SignUp;
