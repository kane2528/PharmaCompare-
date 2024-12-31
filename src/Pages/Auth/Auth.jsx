import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const toggleMode = () => {
    setIsSignup((prevMode) => !prevMode);
    setErrorMessage(''); // Clear any error when switching modes
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
      }
      setErrorMessage('');
      console.log('Signup data:', formData);
      // Call signup API here
    } else {
      console.log('Login data:', formData);
      // Call login API here
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isSignup && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="auth-button">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <p onClick={toggleMode} className="toggle-link">
          {isSignup
            ? 'Already have an account? Login here.'
            : "Don't have an account? Sign up here."}
        </p>
      </form>
    </div>
  );
};

export default Auth;
