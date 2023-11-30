import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.name === 'IncorrectCredentialsError') {
          setMessage('Incorrect email or password. Please try again.');
        } else {
          setMessage('An error occurred. Please try again later.');
        }

        throw result;
      }

      // Store the token in localStorage
      localStorage.setItem('token', result.token);

      setMessage('Login successful!');
      setEmail('');
      setPassword('');
      window.location.href = '/me';
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <Paper elevation={3} style={{ maxWidth: 400, margin: 'auto', padding: 20, marginTop: 50 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 20, backgroundColor: 'salmon' }}
        >
          Login
        </Button>
      </form>
      <Typography variant="body1" align="center" color="error">
        {message}
      </Typography>
    </Paper>
  );
};

export default Login;
