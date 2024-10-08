import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Fade,
} from "@mui/material";
import emailjs from "emailjs-com"; // Import EmailJS

export default function Iletisim() {
  const [fadeIn, setFadeIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the email data
    const templateParams = {
      name,
      email,
      message,
    };

    // Send email using EmailJS
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_USER_ID"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
      });

    // Clear the form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Fade in={fadeIn} timeout={1000}>
      <Container className="page-container">
        <Typography variant="body1" paragraph>
          Herhangi bir soru veya öneriniz varsa, lütfen bizimle iletişime geçin.
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          mt={4}
          onSubmit={handleSubmit}
        >
          <TextField
            required
            fullWidth
            label="Adınız"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="E-posta"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Mesaj"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#174f91", color: "#fff", marginTop: "20px" }} // Updated button color
            type="submit"
          >
            Gönder
          </Button>
        </Box>

        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} style={{ padding: "20px", height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">İletişim Bilgileri</Typography>
              <Typography variant="body1" align="center">
                <strong>Adres:</strong> Enn tepe mall office C Blok 1107
              </Typography>
              <Typography variant="body1" align="center">
                <strong>Telefon:</strong> +90 554 518 85 80
              </Typography>
              <Typography variant="body1" align="center">
                <strong>E-posta:</strong> info@yyamimarlik.com
              </Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <a href="https://www.instagram.com/yyamimarlik/" target="_blank" rel="noopener noreferrer" className="social-button" style={{ margin: "0 10px" }}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/yasin-yarmal%C4%B1-96356b131/" target="_blank" rel="noopener noreferrer" className="social-button" style={{ margin: "0 10px" }}>
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://wa.me/+905545188580" target="_blank" rel="noopener noreferrer" className="social-button" style={{ margin: "0 10px" }}>
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="mailto:info@yyamimarlik.com" className="social-button" style={{ margin: "0 10px" }}>
                  <i className="fas fa-envelope"></i>
                </a>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} style={{ padding: "20px", height: '300px' }}>
              <Typography variant="h5">Harita</Typography>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.880346680031!2d32.4940173887682!3d37.88648083342335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d0856a7b500b6d%3A0xb19f1f4bc78d166d!2sEnntepe%20Mall%20Office!5e0!3m2!1str!2str!4v1728321576053!5m2!1str!2str"
                width="100%"
                height="260" // Adjust height as needed
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Harita"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}
