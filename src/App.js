import "./App.css";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // Framer Motion'ı içe aktar
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
  initial: { opacity: 0, scale: 0.9 }, // Sayfa başlangıçta görünmez ve daha küçük olacak
  animate: { opacity: 1, scale: 1 }, // Sayfa görünür ve normal boyuta gelecek
  transition: { duration: 1.5 }, // Geçiş süresi
};

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif', // Tüm typography için varsayılan yazı tipi
  },
});

function App() {
  const location = useLocation();

  // Anasayfa kontrolü
  const showFooter = location.pathname !== "/"; // Anasayfada footer'ı gizle

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navi />
        <div style={{ flexGrow: 1 }}>
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
        </div>
        {/* Footer yalnızca anasayfa dışındaki sayfalarda görünecek */}
        {showFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
