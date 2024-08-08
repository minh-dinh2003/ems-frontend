import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request with email and password
      const response = await axios.post('https://beneficial-comfort-production.up.railway.app/api/v1/auth/authenticate', {
        email,
        password,
      });

      // Extracting the token from response
      const { token } = response.data;
      console.log(token)
      // Save the token in localStorage
      localStorage.setItem('authToken', token);

      // Redirect to a protected route or home page
      navigate('/'); // Redirect to the default or home page

    } catch (err) {
      // Handle errors
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
