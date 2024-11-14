import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "../resources/Referanslar.css";

export default function Referanslar() {
  const [referanslar, setReferanslar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferanslar = async () => {
      try {
        const response = await fetch("/data/referanslar/referanslar.json");
        if (!response.ok) {
          throw new Error("Referanslar yüklenirken hata oluştu.");
        }
        const data = await response.json();
        setReferanslar(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReferanslar();
  }, []);

  if (loading) {
    return <Typography variant="h6" textAlign="center">Referanslar yükleniyor...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" textAlign="center">Hata: {error}</Typography>;
  }

  return (
    <Container className="page-container">
      <Grid container spacing={4}>
        {referanslar.map((referans, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="referans-card">
              <div className="image-overlay-container">
                <CardMedia
                  component="img"
                  image={referans.image}
                  alt={referans.name}
                  className="referans-image"
                />
                <div className="overlay">
                  <Typography variant="h6" className="overlay-text">{referans.name}</Typography>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
