import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Eğer anasayfa dışında isek footer'ı göster
  if (location.pathname === "/") {
    return null; // Anasayfada isek footer görünmesin
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        py: 2, // Yüksekliği artırmak için padding'i biraz artırıyoruz
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontFamily: '"Poppins", sans-serif', color: "#666" }}
            >
              Enn tepe mall office C Blok 1107 <br />
              +90 554 518 85 80 <br />
              <Link href="mailto:info@yyamimarlik.com" sx={{ color: "#666" }}>
                info@yyamimarlik.com
              </Link>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="body2"
              sx={{ fontFamily: '"Poppins", sans-serif', color: "#999" }}
            >
              © 2024 YYA Mimarlık. Tüm hakları saklıdır.<br />
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
            <img
              src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo.png"
              alt="YYA Mimarlik Logo"
              style={{ height: "80px", width: "auto" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
