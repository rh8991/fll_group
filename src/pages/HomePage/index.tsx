import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AdminPanel from "@/components/AdminPanel/AdminPanel";
import AdminLogin from "@/components/AdminLogin/AdminLogin";
import Hero from "./sections/Hero";
import CoreValues from "./sections/CoreValues";
import About from "./sections/About";
import Gallery from "./sections/Gallery";
import Team from "./sections/Team";
import Project from "./sections/Project";
import GameStrategy from "./sections/GameStrategy";
import RobotDesign from "./sections/RobotDesign";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check if already authenticated in this session
    const authHash = sessionStorage.getItem("admin_auth");
    const storedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
    if (authHash === storedHash) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setIsAdminOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setIsAdminOpen(false);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <CoreValues />
        <About />
        <Gallery />
        <Team />
        <Project />
        <GameStrategy />
        <RobotDesign />
      </main>
      <Footer onAdminClick={handleAdminClick} showAdminButton />
      {showLogin && (
        <AdminLogin
          onAuthenticated={handleAuthenticated}
          onClose={() => setShowLogin(false)}
        />
      )}
      {isAuthenticated && (
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default HomePage;
