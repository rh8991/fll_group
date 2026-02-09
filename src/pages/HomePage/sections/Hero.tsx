import { useContent } from "@/context/ContentContext";
import styles from "./Hero.module.css";

const Hero = () => {
  const { headerTitle, heroSubtitle } = useContent();

  return (
    <section className={styles.hero} id="home">
      <div className={styles.logoContainer}>
        <img
          src="/fll_group/assets/images/logo.png"
          alt="The Shimis Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>{headerTitle || "The Shimis"}</h1>
      </div>
      <p className={styles.subtitle}>
        {heroSubtitle ||
          "חושפים את העבר, בונים את העתיד - ארכיאולוגיה בעידן הדיגיטלי"}
      </p>
      <p className={styles.location}>
        1911 | טכנודע חדרה | עונת UNEARTHED 2026
      </p>
    </section>
  );
};

export default Hero;
