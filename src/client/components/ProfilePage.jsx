import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import CreateShowForm from './CreateShowForm';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [favoriteShows, setFavoriteShows] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found.');
          return;
        }

        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setUserData(data);
        fetchFavoriteShows(data.id, token);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchFavoriteShows = async (userId, token) => {
      try {
        const response = await fetch(`http://localhost:3000/api/favorites/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        const showDetailsPromises = data.favorites.map(async (favorite) => {
          try {
            const showResponse = await fetch(`http://localhost:3000/api/shows/${favorite.show_id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const showData = await showResponse.json();

            if (!showResponse.ok) {
              console.error(showData.message);
              return null;
            }

            console.log('Show Details Response:', showData);

            return showData;
          } catch (error) {
            console.error('Error fetching show details:', error);
            return null;
          }
        });

        const showDetails = await Promise.all(showDetailsPromises);

        console.log('Favorite Shows Details:', showDetails);

        setFavoriteShows(showDetails.filter((show) => show !== null));
      } catch (error) {
        console.error('Error fetching favorite shows:', error);
      }
    };

    fetchUserData();
  }, []); // Run this effect only once, similar to componentDidMount

  return ( 
    <>
    <Container className="mt-5">
      <div className="card">
        <div className="card-body text-center">
          {userData ? (
            <div>
              <img
                src={userData.profile_image_url}
                alt="Profile"
                className="rounded-circle mb-3"
                width="100"
                height="100"
              />
              <h5 className="card-title">Welcome, {userData.name}!</h5>
            </div>
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>

      <Container className="mt-3">
        <h6 className="mb-2 text-muted">Your Favorite Shows:</h6>
        {favoriteShows.length > 0 ? (
          <ListGroup>
            {favoriteShows.map((show) => (
              <Card key={show.show.id} className="mb-3">
                {show.show.image_url && (
                    <img
                      src={show.show.image_url}
                      alt={`Show at ${show.show.venue}`}
                      className="card-img-top"
                      style={{ width: "20vh" }}
                    />
                  )}
                <Card.Body>
                  <Card.Title>{show.show.venue}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{show.show.date}</Card.Subtitle>
                  
                  {/* Add more show details as needed */}
                </Card.Body>
              </Card>
            ))}
          </ListGroup>
        ) : (
          <p>No favorite shows found.</p>
        )}
      </Container>
    </Container>
    <CreateShowForm /> </>
  );
};

export default ProfilePage;
