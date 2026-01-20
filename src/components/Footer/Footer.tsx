import { useContent } from "@/context/ContentContext";
import styles from "./Footer.module.css";

interface FooterProps {
  onAdminClick?: () => void;
  showAdminButton?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  onAdminClick,
  showAdminButton = false,
}) => {
  const { footerLocation, footerSeason, footerCopyright } = useContent();

  // Provide default values if data is missing
  const location = footerLocation || "📍 הטכנודע, חדרה";
  const season = footerSeason || "FIRST LEGO League - עונת UNEARTHED 2026";
  const copyright =
    footerCopyright ||
    "© 2024-2025 Technoda Warriors FLL | כל הזכויות שמורות\nכבוד הדדי • שיתוף פעולה • חדשנות • התמדה";

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerContent}>
        <p>{location}</p>
        <p>{season}</p>
        <p className={styles.copyright}>
          {copyright.split("\\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </p>
      </div>

      {showAdminButton && (
        <button className={styles.adminButton} onClick={onAdminClick}>
          🔧 כניסת מנהל
        </button>
      )}
    </footer>
  );
};

export default Footer;
