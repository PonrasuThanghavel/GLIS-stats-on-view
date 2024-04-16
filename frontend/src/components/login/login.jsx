import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/login.css';

const LoginPage = ({ isAuthenticated, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (email, pass) => {
    try {
      setIsSubmitting(true);

      const response = await fetch('https://glis-backend.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      setIsAuthenticated(true); // Update isAuthenticated state in App.js
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && pass) {
      handleLogin(email, pass);
    } else {
      setError('Please enter both email and password');
    }
  };

  return isAuthenticated ? (
    <>{/* Redirect or navigate to dashboard */}</>
  ) : (
    <div className="body">
      <form onSubmit={onSubmit}>
        <img className="header-img" src="https://img.icons8.com/windows/96/17ed9f/smile-beam.png" alt="login" />
        <h1>Login Page</h1>
        <label htmlFor="email">Email:</label>
        <div className="input-container">
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label htmlFor="password">Password:</label>
        <div className="input-container">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons-container">
          <button id="btn-login" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
      <div className="redirect-message">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
