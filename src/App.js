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

  // Sağ tıklama ve metin seçimini engellemek için eklenen useEffect
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []); // Bu etki sadece bileşen yüklendiğinde bir kez çalışır

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', userSelect: 'none' }}>
        {/* Navi yalnızca loading tamamlanınca ve Proje Detay sayfası haricinde görünecek */}
        {!loading && location.pathname !== "/projeler/" && <Navi />}
        <div style={{ flexGrow: 1 }}>
          {/* Loading animasyonu */}
          <AnimatePresence>
            {loading ? (
              <motion.div
                className="loading-container"
                initial={{ opacity: 1, rotate: 0, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 360, scale: 1 }}
                exit={{ opacity: 0 }} // Solarak kaybolma efekti
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  exit: { duration: 1 }, // Exit sırasında geçiş süresi
                }}
              >
                <motion.img
                  src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo.png"
                  alt="Loading logo"
                  className="loading-logo"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
              </motion.div>
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
                  {/* 404 sayfası en son yer almalı */}
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
          </AnimatePresence>
        </div>
        {/* Footer yalnızca loading tamamlanınca ve anasayfa dışındaki sayfalarda gizli olacak */}
        {!loading && location.pathname !== "/" && location.pathname !== "/projeler/" && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
