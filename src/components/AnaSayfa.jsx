import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../resources/AnaSayfa.css";
import LazyLoad from "react-lazyload";
import { Snackbar, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Kapatma ikonu

const AnaSayfa = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    pauseOnHover: false,
    autoplaySpeed: 9000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/data/anasayfa/anasayfa.json");
        if (!response.ok) {
          throw new Error("JSON dosyasına erişilemiyor");
        }
        const data = await response.json();
        setImageUrls(data);
      } catch (error) {
        console.error("Resimler yüklenirken hata oluştu:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const cookiesConsent = localStorage.getItem("cookiesAccepted");
    if (cookiesConsent) {
      setCookiesAccepted(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem("cookiesAccepted", true);
  };

  const closeSnackbar = () => {
    setCookiesAccepted(true);
  };

  return (
    <div
      className="anasayfa_wrapper"
      style={{
        height: `${window.innerHeight}px`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {imageUrls.map((image, index) => (
          <div key={index}>
            <LazyLoad height={window.innerHeight} offset={100}>
              <div
                className="anasayfa_image"
                style={{
                  background: `url(${image.imageUrl})`,
                  height: "100vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: currentSlide === index ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.5s ease",
                }}
              ></div>
            </LazyLoad>
          </div>
        ))}
      </Slider>

      <div className="info-button-container">
        <button className="info-button">
          <i className="fas fa-info-circle"></i>
        </button>
        <div className="tooltip">
          {imageUrls[currentSlide] && imageUrls[currentSlide].name}
        </div>
      </div>

      <div className="social-buttons">
        <a
          href="https://www.instagram.com/yyamimarlik/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/yasin-yarmal%C4%B1-96356b131/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://wa.me/+905545188580"
          target="_blank"
          rel="noopener noreferrer"
          className="social-button"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="mailto:info@yyamimarlik.com" className="social-button">
          <i className="fas fa-envelope"></i>
        </a>
      </div>

      {/* Material UI Snackbar for cookie consent */}
      <Snackbar
        open={!cookiesAccepted}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={
          <Typography variant="inherit">
            Sizlere daha iyi hizmet sunabilmek adına sitemizde çerez
            konumlandırmaktayız. Kişisel verileriniz, KVKK kapsamında toplanıp
            işlenir. Detaylı bilgi almak için
            <a
              href="/kvkk"
              style={{
                textDecoration: "underline",
                color: "inherit",
                margin: "0 4px",
              }}
            >
              Veri Politikamızı/Aydınlatma Metnimizi
            </a>
            inceleyebilirsiniz. Sitemizi kullanarak, çerezleri kullanmamızı
            kabul etmiş olacaksınız.
          </Typography>
        }
        action={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={acceptCookies}
            >
              Kabul Et
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
              style={{ position: "absolute", right: 8, top: 8 }} // Sağ üst köşeye yerleştirme
            >
              <CloseIcon />
            </IconButton>
          </div>
        }
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Saydamlık ve karartma
            color: "white",
            backdropFilter: "blur(5px)", // Hafif bulanıklık
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)", // Gölge ekleyelim
            maxWidth: "2500px", // Maksimum genişlik
            width: "100%", // Genişliği %100 yap
            position: "relative", // İçeriği konumlamak için
          },
        }}
      />
    </div>
  );
};

export default AnaSayfa;
