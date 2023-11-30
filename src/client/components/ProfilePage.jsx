// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make the API request to get user data from /me route
        const response = await fetch('/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Add your authentication token here
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '10%' }}>
      {user ? (
        <>
          <Typography variant="h4">Welcome, {user.name}!</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
        </>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Paper>
  );
};

export default ProfilePage;
