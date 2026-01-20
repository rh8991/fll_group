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

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerContent}>
        <p>{footerLocation}</p>
        <p>{footerSeason}</p>
        <p className={styles.copyright}>
          {footerCopyright.split("\\n").map((line, i) => (
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
