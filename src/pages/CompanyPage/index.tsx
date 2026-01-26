import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";
import styles from "./CompanyPage.module.css";

const CompanyPage = () => {
  const {
    companyHeroTitle,
    companyHeroTagline,
    companyHeroSubtitle,
    companyAboutText,
    companyFeatures,
    companyContactEmail,
    companyContactPhone,
    companyContactWebsite,
    companyContactText,
  } = useContent();

  // Convert newlines in about text to paragraphs
  const aboutParagraphs = companyAboutText
    .split("\n\n")
    .filter((p) => p.trim());

  return (
    <div className={styles.page}>
      <Header theme="company" />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.logoIcon}>🏛️</div>
            <h1 className={styles.title}>{companyHeroTitle}</h1>
            <p className={styles.tagline}>{companyHeroTagline}</p>
            <p className={styles.subtitle}>{companyHeroSubtitle}</p>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.section} id="about">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>אודות החברה</h2>
            <div className={styles.content}>
              {aboutParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.section} id="features">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>היכולות שלנו</h2>
            <div className={styles.featuresGrid}>
              {companyFeatures.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className={styles.demoSection} id="demo">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>הדגמת המערכת</h2>
            <div className={styles.demoContainer}>
              <div className={styles.demoPlaceholder}>
                <span className={styles.demoIcon}>�️</span>
                <h3 className={styles.demoTitle}>חקר ארכיאולוגי חכם</h3>
                <p>
                  מערכת AI המסווגת ממצאים ארכיאולוגיים בהתבסס על מראה ויזואלי
                </p>
                <p className={styles.demoSubtext}>
                  צילום → העלאה → ניתוח AI → תוצאות
                </p>
                <Link to="/archaeology" className={styles.demoButton}>
                  🚀 נסו חינם
                </Link>
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
                  <span>{companyContactEmail}</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span>{companyContactPhone}</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🌐</span>
                  <span>{companyContactWebsite}</span>
                </div>
              </div>
              <p className={styles.contactText}>{companyContactText}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyPage;
