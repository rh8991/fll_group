import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";
import styles from "./Header.module.css";

interface HeaderProps {
  theme?: "default" | "company";
}

const Header: React.FC<HeaderProps> = ({ theme = "default" }) => {
  const { headerTitle, headerCompanyTitle } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Provide default values if data is missing
  const title = headerTitle || "Technoda Warriors";
  const companyTitle = headerCompanyTitle || "ArcheoVision AI";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCompany = theme === "company";

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${isCompany ? styles.company : ""}`}
    >
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logoIcon}>{isCompany ? "🏛️" : "🏛️"}</span>
            <span className={styles.logoText}>
              {isCompany ? companyTitle : title}
            </span>
          </Link>
        </div>

        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          {isCompany ? (
            <>
              <li>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>
                  אודות
                </a>
              </li>
              <li>
                <a href="#features" onClick={() => setIsMenuOpen(false)}>
                  יכולות
                </a>
              </li>
              <li>
                <a href="#demo" onClick={() => setIsMenuOpen(false)}>
                  הדגמה
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  צור קשר
                </a>
              </li>
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  חזרה לאתר הקבוצה
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="#values" onClick={() => setIsMenuOpen(false)}>
                  ערכי ליבה
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>
                  הקבוצה
                </a>
              </li>
              <li>
                <a href="#project" onClick={() => setIsMenuOpen(false)}>
                  פרויקט
                </a>
              </li>
              <li>
                <a href="#game" onClick={() => setIsMenuOpen(false)}>
                  אסטרטגייה
                </a>
              </li>
              <li>
                <a href="#robot" onClick={() => setIsMenuOpen(false)}>
                  הרובוט
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
