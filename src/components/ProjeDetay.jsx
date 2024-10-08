import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate'ı ekle
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Lightbox from "react-image-lightbox"; 
import "react-image-lightbox/style.css"; 
import Divider from '@mui/material/Divider'; // Divider'ı içe aktar
import { Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Geri gitme ikonu için
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
  const navigate = useNavigate(); // useNavigate hook'unu kullan
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!proje) {
    return <div>Proje bulunamadı.</div>;
  }

  return (
    <Container className="page-container">
      {/* Geri gitme ikonu */}
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '20px' }} onClick={() => navigate(-1)}>
        <ArrowBackIcon style={{ marginRight: '8px' }} />
        <Typography variant="body1" fontFamily="Poppins">Geri</Typography>
      </div>
      
      <Typography fontFamily="Poppins" fontSize="30px">
        {proje.name}
      </Typography>
      <Divider sx={{ my: 2 }} /> {/* Ayırıcı ekleme */}
      <Grid container spacing={2}>
        {proje.images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <img
              src={image}
              alt={proje.name}
              className="project-image"
              onClick={() => openGallery(index)} // Galeriyi açmak için tıklama
            />
          </Grid>
        ))}
      </Grid>

      <div className="proje-description">
        <p>{proje.description}</p>
      </div>

      {isGalleryOpen && (
        <Lightbox
          mainSrc={proje.images[currentImageIndex]} // Şu anki resim
          nextSrc={proje.images[(currentImageIndex + 1) % proje.images.length]} // Sonraki resim
          prevSrc={proje.images[(currentImageIndex + proje.images.length - 1) % proje.images.length]} // Önceki resim
          onCloseRequest={closeGallery} // Kapatma isteği
          onMovePrevRequest={() =>
            setCurrentImageIndex((currentImageIndex + proje.images.length - 1) % proje.images.length) // Önceki resim
          }
          onMoveNextRequest={() =>
            setCurrentImageIndex((currentImageIndex + 1) % proje.images.length) // Sonraki resim
          }
          imageTitle={proje.name} // Resim başlığı
          imageCaption={proje.name} // Resim açıklaması
        />
      )}
    </Container>
  );
}
