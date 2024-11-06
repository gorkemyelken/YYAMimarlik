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
    return <Typography variant="h6">Loading projects...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
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
              <Card sx={{ maxWidth: 345 }}>
                <Link
                  to={`/projeler/${slugify(proje.name)}`} // Slug kullanımı
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    className="card-media"
                    sx={{ height: 300 }}
                    image={proje.images[0]} // Burada resmin URL'sini alıyoruz
                    title={proje.name}
                  />
                </Link>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {proje.name}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
