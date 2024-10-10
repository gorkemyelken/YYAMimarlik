import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navi = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 900px)");
  const location = useLocation(); // Mevcut sayfa rotasını almak için

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "YYA Mimarlık",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported in your browser.");
    }
  };

  const pages = [
    { name: "YYA MİMARLIK", path: "/" },
    { name: "HAKKIMIZDA", path: "/kurumsal" },
    { name: "PROJELER", path: "/projeler" },
    { name: "REFERANSLAR", path: "/referanslar" },
    { name: "İLETİŞİM", path: "/iletisim" },
  ];

  // Sayfa rotasına göre arka plan ve yazı rengi ayarı
  const isHomePage = location.pathname === "/";

  return (
    <AppBar
      fixed
      sx={{
        background: isHomePage
          ? "linear-gradient(to bottom, rgba(0, 0, 0, 1.2), rgba(0, 0, 0, 0))"
          : "rgb(255, 255, 255)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: isMobile ? "space-between" : "center" }}>
        {isMobile ? (
          <>
            {/* Mobil görünüm (Hamburger Menü) */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon sx={{ color: isHomePage ? "white" : "black" }} />
            </IconButton>

            {/* Ortadaki Logo */}
            <a href="/">
              <img
                src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo-mavi.png"
                alt="Logo"
                style={{ height: "100px" }}
              />
            </a>
            {/* Sağdaki Paylaş Butonu */}
            <IconButton color="inherit" onClick={handleShare}>
              <ShareIcon sx={{ color: isHomePage ? "white" : "black" }} />
            </IconButton>

            {/* Menü (Hamburger Menü) */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleMenuClose}
                  component={Link}
                  to={page.path}
                  sx={{
                    textDecoration:
                      location.pathname === page.path ? "underline" : "none", // Alt çizgi
                  }}
                >
                  <Typography fontFamily="Poppins" fontSize="18px">
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : isTablet ? (
          <>
            {/* Tablet görünümü (600px ile 900px arası) */}
            <Box sx={{ position: "static", left: "110px" }}>
              <a href="/">
                <img
                  src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo-mavi.png"
                  alt="Logo"
                  style={{ height: "100px" }}
                />
              </a>
            </Box>

            <Box sx={{ display: "flex", gap: 5 }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={page.path}
                  sx={{
                    letterSpacing: "1",
                    color: isHomePage ? "white" : "black",
                    textDecoration:
                      location.pathname === page.path ? "underline" : "none", // Alt çizgi
                  }}
                >
                  <Typography fontFamily="Poppins" fontSize="18px">
                    {page.name}
                  </Typography>
                </Button>
              ))}
            </Box>

            <IconButton
              sx={{
                position: "static",
                right: "110px", // Sağdan biraz içeri almak için
                color: isHomePage ? "white" : "black",
              }}
              onClick={handleShare}
            >
              <ShareIcon />
            </IconButton>
          </>
        ) : (
          <>
            {/* Masaüstü görünümü (900px ve üstü) */}
            <Box sx={{ position: "absolute", left: "20px" }}>
              <a href="/">
                <img
                  src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo-mavi.png"
                  alt="Logo"
                  style={{ height: "100px" }}
                />
              </a>
            </Box>

            <Box sx={{ display: "flex", gap: 5 }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={page.path}
                  sx={{
                    letterSpacing: "0.5em",
                    color: isHomePage ? "white" : "black",
                    textDecoration:
                      location.pathname === page.path ? "underline" : "none", // Alt çizgi
                  }}
                >
                  <Typography fontFamily="Poppins" fontSize="18px">
                    {page.name}
                  </Typography>
                </Button>
              ))}
            </Box>

            <IconButton
              sx={{
                position: "absolute",
                right: "20px", // Sağdan biraz içeri almak için
                color: isHomePage ? "white" : "black",
              }}
              onClick={handleShare}
            >
              <ShareIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navi;
