import { useContent } from "@/context/ContentContext";
import styles from "./CoreValues.module.css";

const CoreValues = () => {
  const { coreValuesTitle, coreValues } = useContent();

  return (
    <section className={styles.section} id="values">
      <div className={styles.container}>
        <h2 className={styles.title}>{coreValuesTitle || "ערכי הליבה שלנו"}</h2>
        <div className={styles.grid}>
          {coreValues &&
            coreValues.map((value, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.icon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
