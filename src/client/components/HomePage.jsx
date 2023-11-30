// HomePage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';

const HomePage = () => {
  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div className="hero-section">
        {/* Your hero content goes here */}
        <img
          src="public/dsc00500 (3).jpg"  // Replace with your band's image URL
          alt="Band Hero"
          className="img-fluid"
        />
      </div>

      {/* Social Links */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <h2>Follow Us</h2>
            <p>Stay connected with us on social media and streaming platforms.</p>

            {/* Social Media Links */}
            <div className="social-links">
              <Button
                variant="contained"
                color="info"
                href="https://www.instagram.com/discostranger"
                target="_blank"
                className="mx-2"
              >
                Instagram
              </Button>
              {/* ... (other social media buttons) */}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
