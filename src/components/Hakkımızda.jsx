import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

// Scroll animasyonu için keyframes
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
`;

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: theme.spacing(2, 0),
  transition: "transform 0.3s",
  display: "flex", // Flexbox ile eşit yükseklik sağlanacak
  flexDirection: "column",
  justifyContent: "center", // İçeriği dikey ortalar
  height: "100%", // Kutuların tam yüksekliği eşit olacak
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
}));

const AnimatedImageWrapper = styled(Box)({
  position: "relative", // Relative positioning of the wrapper to contain the absolute icon
  width: "100%",
});

const AnimatedImage = styled("img")({
  width: "100%",
  borderRadius: "8px",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const ScrollIcon = styled("div")(({ theme }) => ({
  width: "30px",
  height: "50px",
  border: "2px solid",
  borderRadius: "30px",
  position: "absolute", // Absolute positioning to place it at the bottom of the image
  bottom: "20px", // Aşağıdan 20px yukarıda olacak
  left: "50%", // Ortalamak için soldan %50
  transform: "translateX(-50%)", // Ortada kalmasını sağlamak için soldan %50'nin yarısı kadar geri çekiyoruz
  "&::before": {
    content: '""',
    display: "block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "black",
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    animation: `${bounce} 1.5s infinite`,
  },
}));

const Hakkımızda = () => {
  return (
    <Container className="page-container" maxWidth="lg">
      <AnimatedImageWrapper mt={4}>
        <AnimatedImage
          src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo.png"
          alt="Mimarlık Projesi"
        />
        {/* Scroll aşağı animasyonu */}
        <ScrollIcon />
      </AnimatedImageWrapper>
      <Box mb={4}>
        <Typography variant="body1" paragraph>
          Biz, mimarlık alanında yenilikçi çözümler sunan bir ekibiz. Estetik
          ve işlevselliği bir araya getirerek, yaşam alanlarınızı daha güzel
          hale getirmeyi hedefliyoruz.
        </Typography>
        <Typography variant="body1" paragraph>
          Tecrübemizle, projelerinizi hayata geçirmek için yanınızdayız. Her
          aşamada sizlerle iletişimde kalarak, ihtiyaçlarınıza özel çözümler
          sunuyoruz.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5">Misyonumuz</Typography>
            <Typography variant="body2">
              Kaliteli ve estetik yapılar tasarlayarak, sürdürülebilir yaşam
              alanları yaratmak.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5">Vizyonumuz</Typography>
            <Typography variant="body2">
              Modern mimarlık anlayışıyla, geleceğin şehirlerini inşa etmek.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hakkımızda;
