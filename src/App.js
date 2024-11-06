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
import Kvkk from "./components/Kvkk";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', userSelect: 'none' }}>
        {!loading && location.pathname !== "/projeler/" && <Navi />}
        <div style={{ flexGrow: 1 }}>
          <AnimatePresence>
            {loading ? (
              <motion.div
                className="loading-container"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <motion.img
                  src="https://yyamimarlik.s3.eu-north-1.amazonaws.com/yya-logo-mavi.png"
                  alt="Loading logo"
                  className="loading-logo"
                  initial={{ opacity: 0.8, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.div>
            ) : (
              <AnimatePresence>
                <Routes location={location} key={location.key}>
                  <Route exact path="/" element={<AnaSayfa />} />
                  <Route exact path="/anasayfa" element={<AnaSayfa />} />
                  <Route
                    path="/hakkımızda"
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
                    path="/kvkk"
                    element={
                      <motion.div {...pageTransition}>
                        <Kvkk />
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
          </AnimatePresence>
        </div>
        {!loading && location.pathname !== "/" && location.pathname !== "/projeler/" && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;
