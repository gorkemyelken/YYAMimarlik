import React from "react";
import { Container, Typography, Box, Grid, Paper, Button } from "@mui/material";
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
  color: theme.palette.text.primary,
  backgroundColor: "#f4f4f9",
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  margin: theme.spacing(2, 0),
  transition: "transform 0.3s, box-shadow 0.3s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "100%",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
  },
}));

const AnimatedImageWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  borderRadius: "12px",
  marginBottom: "24px",
});

const AnimatedImage = styled("img")({
  width: "100%",
  borderRadius: "12px",
  transition: "transform 0.3s, filter 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    filter: "brightness(1.1)",
  },
});

const ScrollIcon = styled("div")(({ theme }) => ({
  width: "30px",
  height: "50px",
  border: `2px solid ${theme.palette.text.primary}`,
  borderRadius: "30px",
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  "&::before": {
    content: '""',
    display: "block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: theme.palette.text.primary,
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    animation: `${bounce} 1.5s infinite`,
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(1, 4),
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Hakkımızda = () => {
  return (
    <Container className="page-container" maxWidth="lg">
      <AnimatedImageWrapper mt={4}>
        <AnimatedImage
          src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/YYA+%C3%87%C4%B0ZG%C4%B0DEN+YA%C5%9EAMA+KURUMSAL+RENK-1.png"
          alt="Mimarlık Projesi"
        />
        {/* Scroll aşağı animasyonu */}
        <ScrollIcon />
      </AnimatedImageWrapper>
      <Box mb={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Biz Kimiz?
        </Typography>
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
        <CTAButton variant="contained" href="/projeler">
          Projelerimizi Keşfedin
        </CTAButton>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Misyonumuz
            </Typography>
            <Typography variant="body2">
              Müşterilerimizin hayallerini gerçeğe dönüştürürken, estetik ve
              fonksiyonelliği bir araya getiren, çevreye duyarlı ve teknolojik
              çözümlerle, yaşam kalitesini artıran projeler üretmek. Genç ve
              dinamik ekibimizle sektöre yeni bir bakış açısı getirerek, mimari
              sınırların en üst noktasına ulaşmak ve "çizgiden yaşama" sloganını
              herkese duyurmak.
            </Typography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Vizyonumuz
            </Typography>
            <Typography variant="body2">
              Sürdürülebilirlik, estetik ve fonksiyonelliği bir araya getirerek,
              yaşanabilir ve geleceğe dönük mekanlar tasarlamaktır. İnsan odaklı
              bir yaklaşımla, mimarinin gücünü kullanarak toplumsal değerlere
              katkı sağlamayı hedefliyoruz. Bu hedefte "çizgiden yaşama" her
              durumda müşterimiz ile hayallerindeki yapıyı gerçekleştirmekten
              gurur duyuyoruz.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hakkımızda;
