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
  const isMobile = useMediaQuery("(max-width: 900px)");
  const location = useLocation();

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
    { name: "HAKKIMIZDA", path: "/hakkimizda" },
    { name: "PROJELER", path: "/projeler" },
    { name: "REFERANSLAR", path: "/referanslar" },
    { name: "İLETİŞİM", path: "/iletisim" },
  ];

  const isHomePage = location.pathname === "/";

  const logoUrl = isHomePage
    ? "https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo-beyaz.png"
    : "https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya+intro+logo.png";

  return (
    <AppBar
      fixed
      sx={{
        marginBottom: "10px",
        background: isHomePage
          ? "linear-gradient(to bottom, rgba(0, 0, 0, 1.2), rgba(0, 0, 0, 0))"
          : "rgb(255, 255, 255)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: isMobile ? "space-between" : "center" }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon sx={{ color: isHomePage ? "white" : "black" }} />
            </IconButton>
            <a href="/">
              <img src={logoUrl} alt="Logo" style={{ height: "100px" }} />
            </a>
            <IconButton color="inherit" onClick={handleShare}>
              <ShareIcon sx={{ color: isHomePage ? "white" : "black" }} />
            </IconButton>
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
                    borderBottom: location.pathname === page.path ? "2px solid #194f90" : "none",
                  }}
                >
                  <Typography fontFamily='"Poppins", sans-serif' fontSize="20px">
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ position: "absolute", left: "20px" }}>
              <a href="/">
                <img src={logoUrl} alt="Logo" style={{ height: "100px" }} />
              </a>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={page.path}
                  sx={{
                    position: "relative",
                    color: isHomePage ? "white" : "black",
                    fontSize: "20px", // Font büyütüldü
                    letterSpacing: "0.3rem",
                    fontFamily: '"Poppins", sans-serif', // İstenen font eklendi
                    "&:hover": {
                      color: "#194f90",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -3,
                      height: "2px",
                      width: location.pathname === page.path ? "100%" : "0",
                      backgroundColor: "#194f90",
                      transition: "width 0.3s",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <IconButton
              sx={{
                position: "absolute",
                right: "20px",
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
