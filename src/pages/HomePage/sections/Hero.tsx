import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.logoContainer}>
        <img
          src="/fll_group/assets/images/logo.png"
          alt="The Shimis Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>The Shimis</h1>
      </div>
      <p className={styles.subtitle}>
        חושפים את העבר, בונים את העתיד - ארכיאולוגיה בעידן הדיגיטלי
      </p>
      <p className={styles.location}>הטכנודע חדרה | עונת UNEARTHED 2025</p>
    </section>
  );
};

export default Hero;
