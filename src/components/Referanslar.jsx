import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Fade, Grid } from "@mui/material";
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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {referanslar.slice(0, visibleCards).map((referans) => (
          <Grid item xs={2} sm={4} md={4} key={referans.id}>
            <Fade in={true} timeout={500}>
              <Card sx={{ maxWidth: 300 }}>
                  <CardMedia
                    className="card-media"
                    sx={{ height: 300, objectFit: 'cover' }} 
                    image={referans.image} 
                    title={referans.name}
                  />
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


