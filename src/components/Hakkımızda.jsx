import React from "react";
import { Container, Typography, Box, Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../resources/Hakkımızda.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  backgroundColor: "#ffffff", // İlk başta beyaz arka plan
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(2, 0),
  transition: "transform 0.3s, box-shadow 0.3s, background-color 0.3s, color 0.3s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#194f90", // Logonun mavisi
    color: "#ffffff", // Yazılar beyaz
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#194f90", // Logonun mavisi
  color: "#fff",
  padding: theme.spacing(1, 4),
  transition: "background-color 0.3s, box-shadow 0.3s",
  "&:hover": {
    backgroundColor: "#153a6b", // Daha koyu mavi
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  },
}));

const Hakkımızda = () => {
  return (
    <Container className="page-container" maxWidth="lg">
      <Box className="animated-image-wrapper">
        <img
          className="animated-image"
          src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/YYA+%C3%87%C4%B0ZG%C4%B0DEN+YA%C5%9EAMA+KURUMSAL+RENK-1.png"
          alt="Mimarlık Projesi"
        />
        <div className="scroll-icon"></div>
      </Box>
      <Box mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Biz Kimiz?
        </Typography>
        <Typography variant="body1" paragraph>
          Biz, mimarlık alanında yenilikçi çözümler sunan bir ekibiz. Estetik ve işlevselliği bir araya getirerek, yaşam alanlarınızı daha güzel hale getirmeyi hedefliyoruz.
        </Typography>
        <Typography variant="body1" paragraph>
          Tecrübemizle, projelerinizi hayata geçirmek için yanınızdayız. Her aşamada sizlerle iletişimde kalarak, ihtiyaçlarınıza özel çözümler sunuyoruz.
        </Typography>
        <CTAButton variant="contained" href="/projeler">
          Projelerimizi Keşfedin
        </CTAButton>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h4" gutterBottom>
              Misyonumuz
            </Typography>
            <Typography variant="body1">
              Müşterilerimizin hayallerini gerçeğe dönüştürürken, estetik ve fonksiyonelliği bir araya getiren, çevreye duyarlı ve teknolojik çözümlerle, yaşam kalitesini artıran projeler üretmek.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h4" gutterBottom>
              Vizyonumuz
            </Typography>
            <Typography variant="body1">
              Sürdürülebilirlik, estetik ve fonksiyonelliği bir araya getirerek, yaşanabilir ve geleceğe dönük mekanlar tasarlamaktır. İnsan odaklı bir yaklaşımla, mimarinin gücünü kullanarak toplumsal değerlere katkı sağlamayı hedefliyoruz.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hakkımızda;
