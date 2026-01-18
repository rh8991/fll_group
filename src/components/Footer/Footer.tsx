import styles from './Footer.module.css'

interface FooterProps {
  onAdminClick?: () => void
  showAdminButton?: boolean
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, showAdminButton = false }) => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerContent}>
        <p>📍 הטכנודע, חדרה</p>
        <p>🏛️ FIRST LEGO League - עונת UNEARTHED 2025</p>
        <p className={styles.copyright}>
          © 2024-2025 Technoda Warriors FLL | כל הזכויות שמורות<br />
          כבוד הדדי • שיתוף פעולה • חדשנות • התמדה
        </p>
      </div>

      {showAdminButton && (
        <button className={styles.adminButton} onClick={onAdminClick}>
          🔧 כניסת מנהל
        </button>
      )}
    </footer>
  )
}

export default Footer
