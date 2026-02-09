import { useContent } from "@/context/ContentContext";
import styles from "./RobotDesign.module.css";

const RobotDesign = () => {
  const { robotDesignTitle, robotDesignSubtitle, robotDesignCards } =
    useContent();

  return (
    <section className={styles.section} id="robot">
      <div className={styles.container}>
        <h2 className={styles.title}>
          {robotDesignTitle || "תכנון הרובוט שלנו"}
        </h2>
        <p className={styles.subtitle}>
          {robotDesignSubtitle ||
            "פיתחנו רובוט מודולרי עם זרועות מתחלפות ותכנות מתקדם"}
        </p>

        <div className={styles.grid}>
          {robotDesignCards &&
            robotDesignCards.map((card, index) => (
              <div key={index} className={styles.card}>
                <span className={styles.icon}>{card.icon || "⚙️"}</span>
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default RobotDesign;
