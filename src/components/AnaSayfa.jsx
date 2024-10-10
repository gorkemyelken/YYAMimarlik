import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../resources/AnaSayfa.css";
import LazyLoad from "react-lazyload"; 

const AnaSayfa = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

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
        const response = await fetch("/data/anasayfa/anasayfa.json");  // public klasöründen JSON dosyası alınıyor
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
        <a href="https://www.instagram.com/yyamimarlik/" target="_blank" rel="noopener noreferrer" className="social-button">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/yasin-yarmal%C4%B1-96356b131/" target="_blank" rel="noopener noreferrer" className="social-button">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://wa.me/+905545188580" target="_blank" rel="noopener noreferrer" className="social-button">
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="mailto:info@yyamimarlik.com" className="social-button">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </div>
  );
};

export default AnaSayfa;