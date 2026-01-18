import styles from './GameStrategy.module.css'

const GameStrategy = () => {
  return (
    <section className={styles.section} id="game">
      <div className={styles.container}>
        <h2 className={styles.title}>אסטרטגיית המשחק שלנו</h2>
        <p className={styles.subtitle}>
          בחרנו להתמקד במשימות עם ניקוד גבוה ודיוק מקסימלי, תוך שמירה על אסימוני הדיוק
        </p>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.icon}>🎯</span>
            <h4>משימות עדיפות ראשונה</h4>
            <ul>
              <li><strong>משימה 01:</strong> ניקוי משטחים (20 נקודות)</li>
              <li><strong>משימה 03:</strong> חוקרת מכרות (40 נקודות עם בונוס)</li>
              <li><strong>משימה 04:</strong> חילוץ זהיר (40 נקודות)</li>
              <li><strong>משימה 07:</strong> הרמת משאות כבדים (30 נקודות)</li>
            </ul>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>🔄</span>
            <h4>סדר ביצוע אופטימלי</h4>
            <p>
              1️⃣ התחלה עם ניקוי משטחים - משימה קלה לחימום<br />
              2️⃣ מעבר לחילוץ זהיר - דורש דיוק גבוה<br />
              3️⃣ הרמת משאות כבדים - משימת כוח<br />
              4️⃣ חוקרת מכרות - משימה עם בונוס<br />
              5️⃣ איסוף פריטים לפורום - ניצול זמן נותר
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>🎲</span>
            <h4>ניהול אסימוני דיוק</h4>
            <p>
              אסטרטגיה: <strong>שמירה על מקסימום אסימונים!</strong><br /><br />
              • תכנון מסלולים בדייקנות מירבית<br />
              • הימנעות מיציאות מיותרות מהבית<br />
              • בדיקת חיישנים לפני כל שיגור<br />
              • 6 אסימונים = 50 נקודות בונוס!
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>⚙️</span>
            <h4>גיבוי ותוכניות חלופיות</h4>
            <p>
              • <strong>תוכנית A:</strong> מסלול אגרסיבי (100+ נקודות)<br />
              • <strong>תוכנית B:</strong> מסלול בטוח (80+ נקודות)<br />
              • <strong>תוכנית C:</strong> משימות פשוטות (60+ נקודות)<br />
              • גמישות בהתאם לתנאי הזירה
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GameStrategy
