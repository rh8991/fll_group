import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroIcon}>🏛️</div>
      <h1 className={styles.title}>Technoda Warriors</h1>
      <p className={styles.subtitle}>חושפים את העבר, בונים את העתיד - ארכיאולוגיה בעידן הדיגיטלי</p>
      <p className={styles.location}>🏫 הטכנודע חדרה | עונת UNEARTHED 2025</p>
    </section>
  )
}

export default Hero
