import { useContent } from "@/context/ContentContext";
import styles from "./About.module.css";

const About = () => {
  const { aboutText } = useContent();

  const defaultText = `ברוכים הבאים לקבוצת The Shimis מהטכנודע בחדרה!
אנחנו קבוצת FLL נלהבת המורכבת מחברים מוכשרים שמאמינים שטכנולוגיה יכולה לשמר ולחשוף את אוצרות העבר.
בעונת UNEARTHED 2026, אנחנו מתמקדים בפיתוח פתרונות חדשניים לתחום הארכיאולוגיה.

הקבוצה שלנו משלבת חשיבה יצירתית, עבודת צוות מצוינת, ומיומנויות טכניות מתקדמות.
אנחנו מונחים על ידי ארבעת ערכי הליבה שלנו: כבוד הדדי, שיתוף פעולה, חדשנות והתמדה.
ביחד, אנחנו עובדים כדי להוכיח שטכנולוגיה נגישה יכולה לחולל מהפכה בחקר העבר.`;

  const displayText = aboutText || defaultText;

  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <h2 className={styles.title}>אודות הקבוצה</h2>
        <div className={styles.content}>
          {displayText
            .split("\n")
            .map(
              (paragraph, index) =>
                paragraph.trim() && <p key={index}>{paragraph}</p>,
            )}
        </div>
      </div>
    </section>
  );
};

export default About;
