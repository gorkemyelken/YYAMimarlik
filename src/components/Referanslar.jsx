import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Fade, Grid } from "@mui/material";
import "../resources/Referanslar.css"; // Ortak CSS dosyasını kullanın

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

export default function Referanslar() {
  const [referanslar, setReferanslar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    const fetchReferanslar = async () => {
      try {
        const response = await fetch("/data/referanslar/referanslar.json");
        if (!response.ok) {
          throw new Error("Referanslar yüklenirken hata oluştu");
        }
        const data = await response.json();
        setReferanslar(data);
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

    fetchReferanslar();
  }, []);

  if (loading) {
    return <Typography variant="h6" textAlign="center">Referanslar yükleniyor...</Typography>;
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
        {referanslar.slice(0, visibleCards).map((referans) => (
          <Grid item xs={2} sm={4} md={4} key={referans.id}>
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
                <CardMedia
                  className="card-media"
                  sx={{ height: 300, objectFit: "cover" }}
                  image={referans.image}
                  title={referans.name}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    {referans.name}
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
