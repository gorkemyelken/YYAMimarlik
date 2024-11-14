import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Divider from '@mui/material/Divider';
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../resources/ProjeDetay.css";

const slugify = (text) => {
  const turkishToEnglish = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
  };

  const replacedText = text.split('').map(char => turkishToEnglish[char] || char).join('');

  return replacedText
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim();
};

export default function ProjeDetay() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [proje, setProje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjeDetay = async () => {
      try {
        const response = await fetch("/data/projeler/projeler.json");
        if (!response.ok) {
          throw new Error("Proje detayları yüklenirken hata oluştu.");
        }
        const projeler = await response.json();
        const foundProje = projeler.find((p) => slugify(p.name) === slug);
        setProje(foundProje);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProjeDetay();
  }, [slug]);

  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  if (loading) {
    return <Typography variant="h6" textAlign="center">Projeler yükleniyor...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" textAlign="center">Hata: {error}</Typography>;
  }

  if (!proje) {
    return <Typography variant="h6" textAlign="center">Proje bulunamadı.</Typography>;
  }

  return (
    <Container className="page-container">
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: "#194f90", display:"flex" }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Typography variant="h4" gutterBottom sx={{ color: "#194f90"}}>
        {proje.name}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {proje.images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <img
              src={image}
              alt={proje.name}
              className="project-image"
              onClick={() => openGallery(index)}
            />
          </Grid>
        ))}
      </Grid>

      <div className="proje-description">
      <Typography variant="body1" paragraph>
          {proje.description}
        </Typography>
      </div>

      {isGalleryOpen && (
        <Lightbox
          mainSrc={proje.images[currentImageIndex]}
          nextSrc={proje.images[(currentImageIndex + 1) % proje.images.length]}
          prevSrc={proje.images[(currentImageIndex + proje.images.length - 1) % proje.images.length]}
          onCloseRequest={closeGallery}
          onMovePrevRequest={() =>
            setCurrentImageIndex((currentImageIndex + proje.images.length - 1) % proje.images.length)
          }
          onMoveNextRequest={() =>
            setCurrentImageIndex((currentImageIndex + 1) % proje.images.length)
          }
          imageTitle={proje.name}
          imageCaption={`${currentImageIndex + 1} / ${proje.images.length}`}
        />
      )}
    </Container>
  );
}
