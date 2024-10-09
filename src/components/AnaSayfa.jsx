import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import LazyLoad from "react-lazyload";  // LazyLoad bileşeni ekleniyor
import "../resources/AnaSayfa.css";

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
      {/* Kalan sosyal medya ve diğer butonlar */}
    </div>
  );
};

export default AnaSayfa;
