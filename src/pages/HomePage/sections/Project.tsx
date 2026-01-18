import { Link } from 'react-router-dom'
import { useContent } from '@/context/ContentContext'
import styles from './Project.module.css'

const Project = () => {
  const { problemText, solutionText, implementationText } = useContent()

  const defaultProblem = `עולם הארכיאולוגיה מתמודד עם אתגר משמעותי: עלות גבוהה מאוד של כלים טכנולוגיים מתקדמים.
רחפנים מקצועיים, מצלמות ברזולוציה גבוהה, מערכות סריקה תלת-ממדיות ותוכנות ניתוח מתקדמות עולים עשרות ומאות אלפי שקלים, מה שהופך את הכלים הללו לבלתי נגישים עבור חוקרים רבים, ארגונים קטנים ומוסדות חינוכיים.

המצב הנוכחי גורם לכך שגילויים ארכיאולוגיים חשובים עלולים להישאר מוסתרים, אתרים עתיקים אינם מתועדים כראוי, והידע על העבר שלנו נשאר מוגבל למעטים.`

  const defaultSolution = `פיתחנו ממשק תוכנה חכם מבוסס בינה מלאכותית שמאפשר לכל אחד לבצע ניתוח ארכיאולוגי מקצועי באמצעות ציוד זמין ונגיש. המערכת שלנו מקבלת וידאו ותמונות ממקורות פשוטים כמו:

📱 סמארטפונים רגילים - צילום ישיר מהטלפון
🚁 רחפנים זולים - רחפנים צעירים במחירים נגישים
📷 מצלמות פשוטות - מצלמות דיגיטליות בסיסיות`

  const defaultImplementation = `שלב 1: פיתוח מנוע הבינה המלאכותית
• אימון מודלים של Computer Vision על מאגרי תמונות ארכיאולוגיות
• שימוש באלגוריתמי Deep Learning לזיהוי דפוסים וסיווג

שלב 2: בניית הממשק והאפליקציה
• יצירת ממשק משתמש ידידותי ואינטואיטיבי
• אפשרות לצילום ישיר מהטלפון או העלאת תמונות קיימות`

  return (
    <section className={styles.section} id="project">
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>הפרויקט השנתי: ארכיאולוגיה חכמה</h2>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>
              <span className={styles.icon}>🔍</span>
              הבעיה
            </h3>
            <div className={styles.content}>
              {(problemText || defaultProblem).split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className={styles.card}>
            <h3>
              <span className={styles.icon}>💡</span>
              הפתרון
            </h3>
            <div className={styles.content}>
              {(solutionText || defaultSolution).split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className={styles.card}>
            <h3>
              <span className={styles.icon}>⚙️</span>
              דרך היישום
            </h3>
            <div className={styles.content}>
              {(implementationText || defaultImplementation).split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
              <div className={styles.buttonContainer}>
                <Link to="/company" className={styles.button}>
                  🌐 בקר באתר החברה שפיתחה את המערכת
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Project
