import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
} from '@mui/material';

const FormContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: 'salmon',
}));

const CreateShowForm = ({ onShowCreated }) => {
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found.');
        return;
      }

      const response = await fetch('http://localhost:3000/api/shows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ venue, date, time, price, imageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Error creating show.');
        setOpenSnackbar(true);
        return;
      }

      setMessage('Show created successfully!');
      setOpenSnackbar(true);
      setVenue('');
      setDate('');
      setTime('');
      setPrice('');
      setImageUrl('');

      // Notify the parent component that a new show has been created
      if (onShowCreated) {
        onShowCreated(data);
      }
    } catch (error) {
      console.error('Error creating show:', error);
      setMessage('An error occurred. Please try again later.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h6" align="center" gutterBottom>
        Create a New Show
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Venue"
          variant="outlined"
          fullWidth
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <FormField
          label=""
          variant="outlined"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <FormField
          label=""
          variant="outlined"
          type="time"
          fullWidth
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <FormField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <FormField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Create Show
        </SubmitButton>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </FormContainer>
  );
};

export default CreateShowForm;
