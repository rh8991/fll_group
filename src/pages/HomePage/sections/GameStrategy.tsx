import { useContent } from "@/context/ContentContext";
import styles from "./GameStrategy.module.css";

const GameStrategy = () => {
  const { gameStrategyTitle, gameStrategySubtitle, gameStrategyCards } =
    useContent();

  return (
    <section className={styles.section} id="game">
      <div className={styles.container}>
        <h2 className={styles.title}>
          {gameStrategyTitle || "אסטרטגיית המשחק שלנו"}
        </h2>
        <p className={styles.subtitle}>
          {gameStrategySubtitle ||
            "בחרנו להתמקד במשימות עם ניקוד גבוה ודיוק מקסימלי, תוך שמירה על אסימוני הדיוק"}
        </p>

        <div className={styles.grid}>
          {gameStrategyCards &&
            gameStrategyCards.map((card, index) => (
              <div key={index} className={styles.card}>
                <span className={styles.icon}>{card.icon || "🎯"}</span>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GameStrategy;
