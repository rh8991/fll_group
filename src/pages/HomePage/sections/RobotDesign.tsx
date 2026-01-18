import styles from './RobotDesign.module.css'

const RobotDesign = () => {
  return (
    <section className={styles.section} id="robot">
      <div className={styles.container}>
        <h2 className={styles.title}>תכנון הרובוט שלנו</h2>
        <p className={styles.subtitle}>
          פיתחנו רובוט מודולרי עם זרועות מתחלפות ותכנות מתקדם
        </p>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.icon}>🏗️</span>
            <h4>מבנה בסיס חזק</h4>
            <p>
              • מסגרת יציבה ממרכזי LEGO Technic<br />
              • 4 גלגלים עם מתלים לספיגת זעזועים<br />
              • מרכז כובד נמוך למניעת התהפכות<br />
              • עיצוב קומפקטי לניווט בזירה<br />
              • משקל מאוזן להדבקות מיטבית
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>🦾</span>
            <h4>זרועות ייעודיות</h4>
            <p>
              <strong>זרוע 1 - אחיזה:</strong> מנגנון צבת לאיסוף פריטים<br />
              <strong>זרוע 2 - דחיפה:</strong> להזזת משקולות כבדות<br />
              <strong>זרוע 3 - הרמה:</strong> מערכת מנוף להרמת עצמים<br />
              <strong>זרוע 4 - מברשת:</strong> לניקוי משטחים<br />
              כל הזרועות מחליפות במהירות!
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>👁️</span>
            <h4>מערכת חיישנים</h4>
            <p>
              🎨 <strong>2 חיישני צבע:</strong> עוקבי קו ומזהי אזורים<br />
              📏 <strong>חיישן אולטרסוני:</strong> מדידת מרחקים<br />
              🧭 <strong>ג'יירוסקופ:</strong> שמירה על כיוון ישר<br />
              ✋ <strong>חיישן מגע:</strong> זיהוי התנגשויות<br />
              כיול מדויק לפני כל מקצה!
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>💻</span>
            <h4>תכנות חכם</h4>
            <p>
              • <strong>שפת תכנות:</strong> Python / Scratch<br />
              • <strong>PID Controller:</strong> תנועה מדויקת<br />
              • <strong>State Machine:</strong> ניהול משימות<br />
              • <strong>Error Handling:</strong> טיפול בתקלות<br />
              • קוד מודולרי ומתועד היטב
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>🔋</span>
            <h4>ניהול אנרגיה</h4>
            <p>
              • סוללה נטענת של EV3/SPIKE<br />
              • אופטימיזציה של צריכת חשמל<br />
              • בדיקת מצב סוללה לפני מקצה<br />
              • שימוש חכם במנועים<br />
              • זמן פעולה: 45+ דקות
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.icon}>🔧</span>
            <h4>תחזוקה ושיפורים</h4>
            <p>
              • בדיקות שבועיות של כל הרכיבים<br />
              • תיעוד שינויים במחברת הנדסית<br />
              • בדיקות אמינות חוזרות<br />
              • שיפור מתמיד על בסיס ניסוי<br />
              • גיבוי חלקים קריטיים
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RobotDesign
