import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Fade } from '@mui/material';
import '../resources/Referanslar.css'; // Ensure to import the CSS file

export default function Referanslar() {
  const [referanslar, setReferanslar] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferanslar = async () => {
      try {
        const response = await fetch('/data/referanslar/referanslar.json'); // Correct path to JSON file
        if (!response.ok) {
          throw new Error("Referanslar yüklenirken hata oluştu");
        }
        const data = await response.json();
        setReferanslar(data);
        setLoading(false);
        
        // Animate each card by increasing the visibleCards count
        for (let i = 0; i < data.length; i++) {
          setTimeout(() => {
            setVisibleCards((prev) => prev + 1);
          }, (i + 1) * 300); // Delay between cards
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReferanslar();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading references...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  return (
    <Container className="page-container">
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {referanslar.slice(0, visibleCards).map(referans => (
          <Grid item xs={2} sm={4} md={4} key={referans.id}>
            {/* Add Fade animation */}
            <Fade in={true} timeout={500}>
              <Card sx={{ maxWidth: 345, position: 'relative', overflow: 'hidden' }}>
                {/* Container for image and title */}
                <div style={{ position: 'relative' }}>
                  <CardMedia
                    className="card-media"  // Apply the CSS class here
                    component="img"
                    image={referans.image}
                    alt={referans.name}  // Use "ad" as the alt text
                    sx={{ height: '100%', width: '100%', objectFit: 'cover' }} // Make the image cover the entire square
                  />
                  {/* Title overlay */}
                  <Typography
                    variant="h6"
                    component="div"
                    className="overlay-text" // Use a CSS class for the overlay
                  >
                    {referans.name}
                  </Typography>
                </div>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
