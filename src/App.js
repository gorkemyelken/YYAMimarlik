import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Hakkımızda from "./components/Hakkımızda";
import Projelerimiz from "./components/Projelerimiz";
import İletisim from "./components/İletisim";
import Referanslar from "./components/Referanslar";
import Error404 from "./components/Error404";
import ProjeDetay from "./components/ProjeDetay";
import AnaSayfa from "./components/AnaSayfa";
import Navi from "./components/Navi";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "./components/Footer";

const pageTransition = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.5 },
};

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // loading state

  // Sayfa yüklendiğinde ve rota değiştiğinde loading state'ini güncelle
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false); // sayfa yüklenince loading'i false yap
    }, 1500); // yüklenme süresi, bu süre isteğe bağlıdır
    return () => clearTimeout(timer);
  }, [location]); // her rota değişiminde bu etki tetiklenir

  const showFooter = location.pathname !== "/"; // Footer yalnızca anasayfa dışındaki sayfalarda görünür

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navi />
        <div style={{ flexGrow: 1 }}>
          {/* Loading animasyonu */}
          {loading ? (
            <div className="loading-container">
              {/* Framer Motion ile logo animasyonu */}
              <motion.img
                src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo.png"
                alt="Loading logo"
                initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 360, scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                className="loading-logo"
              />
            </div>
          ) : (
            // Sayfa içerikleri (loading tamamlanınca gösterilecek)
            <AnimatePresence>
              <Routes location={location} key={location.key}>
                <Route exact path="/" element={<AnaSayfa />} />
                <Route exact path="/anasayfa" element={<AnaSayfa />} />
                <Route
                  path="/kurumsal"
                  element={
                    <motion.div {...pageTransition}>
                      <Hakkımızda />
                    </motion.div>
                  }
                />
                <Route
                  path="/projeler"
                  element={
                    <motion.div {...pageTransition}>
                      <Projelerimiz />
                    </motion.div>
                  }
                />
                <Route
                  path="/projeler/:slug" 
                  element={
                    <motion.div {...pageTransition}>
                      <ProjeDetay />
                    </motion.div>
                  }
                />
                <Route
                  path="/iletisim"
                  element={
                    <motion.div {...pageTransition}>
                      <İletisim />
                    </motion.div>
                  }
                />
                <Route
                  path="/referanslar"
                  element={
                    <motion.div {...pageTransition}>
                      <Referanslar />
                    </motion.div>
                  }
                />
                <Route
                  path="*"
                  element={
                    <motion.div {...pageTransition}>
                      <Error404 />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          )}
        </div>
        {/* Footer yalnızca anasayfa dışındaki sayfalarda görünecek */}
        {showFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
