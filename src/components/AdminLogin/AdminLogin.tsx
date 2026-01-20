import { useState } from "react";
import styles from "./AdminLogin.module.css";

interface AdminLoginProps {
  onAuthenticated: () => void;
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
  onAuthenticated,
  onClose,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hashPassword = async (pwd: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(pwd);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const hashedInput = await hashPassword(password);
      const storedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH?.trim();

      console.log("Input hash:", hashedInput);
      console.log("Stored hash:", storedHash);
      console.log("Match:", hashedInput === storedHash);

      if (!storedHash) {
        setError("שגיאת הגדרות - צור קשר עם מנהל");
        return;
      }

      if (hashedInput === storedHash) {
        // Store authentication in sessionStorage (cleared when browser closes)
        sessionStorage.setItem("admin_auth", hashedInput);
        onAuthenticated();
      } else {
        setError("סיסמה שגויה");
        setPassword("");
      }
    } catch (err) {
      setError("שגיאה בהתחברות");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.logoContainer}>
          <img
            src="/fll_group/assets/images/technoda_logo.png"
            alt="Technoda Logo"
            className={styles.logo}
          />
        </div>
        <h2 className={styles.title}>🔐 התחברות מנהל</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password">סיסמה:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הכנס סיסמת מנהל"
              autoFocus
              disabled={isLoading}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "מתחבר..." : "התחבר"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
