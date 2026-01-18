import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './CompanyPage.module.css'

const CompanyPage = () => {
  return (
    <div className={styles.page}>
      <Header theme="company" />
      
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.logoIcon}>🏛️</div>
            <h1 className={styles.title}>ArcheoVision AI</h1>
            <p className={styles.tagline}>בינה מלאכותית לארכיאולוגיה נגישה</p>
            <p className={styles.subtitle}>
              המערכת הראשונה בישראל לזיהוי ארכיאולוגי אוטומטי באמצעות טלפונים ורחפנים זולים
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.section} id="about">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>אודות החברה</h2>
            <div className={styles.content}>
              <p>
                <strong>ArcheoVision AI</strong> היא חברת טכנולוגיה חדשנית שמטרתה לעשות את עולם הארכיאולוגיה
                נגיש לכולם. אנחנו מאמינים שכל אחד צריך להיות מסוגל לתרום לגילוי וחקר העבר שלנו, לא רק מומחים
                עם ציוד יקר.
              </p>
              <p>
                באמצעות מערכת הבינה המלאכותית המתקדמת שלנו, אנחנו מאפשרים לכל אדם עם טלפון חכם או רחפן זול
                לבצע ניתוחים ארכיאולוגיים ברמה מקצועית, ללא צורך בהשקעה של עשרות אלפי שקלים בציוד מקצועי.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.section} id="features">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>היכולות שלנו</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>📱</span>
                <h3>צילום מהטלפון</h3>
                <p>הפוך כל סמארטפון לכלי ארכיאולוגי מתקדם עם יכולות זיהוי AI מובנות</p>
              </div>
              
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🚁</span>
                <h3>סריקות מהאוויר</h3>
                <p>זיהוי אתרים ארכיאולוגיים באמצעות רחפנים צעירים ונגישים בעלות נמוכה</p>
              </div>
              
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🏺</span>
                <h3>זיהוי אוטומטי</h3>
                <p>מערכת AI מתקדמת לזיהוי עתיקות, סיווג סוגים, ושיערוך תקופות היסטוריות</p>
              </div>
              
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🗺️</span>
                <h3>אינטגרציה עם GovMap</h3>
                <p>חיבור ישיר למערכת המיפוי הארצית של רשות העתיקות לתיעוד ושיתוף</p>
              </div>
              
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>💻</span>
                <h3>פלטפורמה רב-ערוצית</h3>
                <p>גישה דרך אתר, אפליקציה למובייל, וממשק API למפתחים</p>
              </div>
              
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>⚡</span>
                <h3>תוצאות מיידיות</h3>
                <p>קבל ניתוח מפורט תוך שניות עם רמת דיוק גבוהה</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className={styles.demoSection} id="demo">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>הדגמת המערכת</h2>
            <div className={styles.demoContainer}>
              <div className={styles.demoPlaceholder}>
                <span className={styles.demoIcon}>🎥</span>
                <p>כאן תוצג הדגמה של המערכת בפעולה</p>
                <p className={styles.demoSubtext}>צילום → העלאה → ניתוח AI → תוצאות</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.section} id="contact">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>צור קשר</h2>
            <div className={styles.contactContent}>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <span>info@archeovision.ai</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span>04-1234567</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🌐</span>
                  <span>www.archeovision.ai</span>
                </div>
              </div>
              <p className={styles.contactText}>
                מעוניינים לשתף פעולה? צרו איתנו קשר ונשמח להציג את המערכת שלנו!
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default CompanyPage
