import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Fade, Grid } from "@mui/material";
import "../resources/Projelerimiz.css";

// Güncellenmiş slug fonksiyonu
const slugify = (text) => {
  const turkishToEnglish = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
  };

  const replacedText = text.split('').map(char => turkishToEnglish[char] || char).join('');

  return replacedText
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Boşlukları '-' ile değiştir
    .replace(/[^\w\-]+/g, '') // Özel karakterleri sil
    .replace(/\-\-+/g, '-') // Birden fazla '-' ile olanları tek '-' ile değiştir
    .trim(); // Başındaki ve sonundaki '-' karakterlerini sil
};

export default function Projelerimiz() {
  const [projeler, setProjeler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const fetchProjeler = async () => {
      try {
        const response = await fetch("/data/projeler/projeler.json");
        if (!response.ok) {
          throw new Error("Projeler yüklenirken hata oluştu");
        }
        const data = await response.json();
        setProjeler(data);
        setLoading(false);
        for (let i = 0; i < data.length; i++) {
          setTimeout(() => {
            setVisibleCards((prev) => prev + 1);
          }, (i + 1) * 300);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjeler();
  }, []);

  if (loading) {
    return <Typography variant="h6" textAlign="center">Projeler yükleniyor...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        Hata: {error}
      </Typography>
    );
  }

  return (
    <Container className="page-container">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {projeler.slice(0, visibleCards).map((proje) => (
          <Grid item xs={2} sm={4} md={4} key={proje.id}>
            <Fade in={true} timeout={500}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Link
                  to={`/projeler/${slugify(proje.name)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardMedia
                    className="card-media"
                    sx={{ height: 300, objectFit: "cover" }}
                    image={proje.images[0]}
                    title={proje.name}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                      {proje.name}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
