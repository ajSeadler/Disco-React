import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';


const RootPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 600,
  margin: 'auto',
  marginTop: '10%',
}));

const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ShowsList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {

    document.body.classList.add('shows-list-page');

    const fetchShows = async () => {
      try {
        // Make the API request to get shows (adjust the URL based on your API route)
        const response = await fetch('/api/shows');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
    return () => {
      document.body.classList.remove('shows-list-page');
    };
  }, []);

  return (
    <RootPaper elevation={3} className='shows-card'>
      <Heading variant="h4">
        Upcoming Shows
      </Heading>
      <List>
        {shows.map((show, index) => (
          <React.Fragment key={show.id}>
            {index > 0 && <Divider />}
            <ListItem>
              <ListItemText
                primary={
                  <>
                    <strong>Venue:</strong> {show.venue}
                  </>
                }
                secondary={
                  <>
                    <strong>Date:</strong> {show.date}, <strong>Time:</strong> {show.time},{' '}
                    <strong>Price:</strong> ${show.price}
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      <Link to="/">Go back to Home</Link>
    </RootPaper>
  );
};

export default ShowsList;
