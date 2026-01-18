import styles from './CoreValues.module.css'

const values = [
  {
    icon: '🤝',
    title: 'כבוד הדדי',
    description: 'אנחנו מכבדים את כל חברי הצוות ואת הקבוצות המתחרות, ומעריכים את התרומה הייחודית של כל אחד'
  },
  {
    icon: '👥',
    title: 'שיתוף פעולה',
    description: 'עובדים יחד כצוות, משלבים כישורים ורעיונות להשגת מטרות משותפות'
  },
  {
    icon: '💡',
    title: 'חדשנות',
    description: 'חושבים מחוץ לקופסה, מחפשים פתרונות יצירתיים לבעיות מורכבות'
  },
  {
    icon: '💪',
    title: 'התמדה',
    description: 'לא מוותרים מול אתגרים, לומדים מטעויות וממשיכים להתקדם'
  }
]

const CoreValues = () => {
  return (
    <section className={styles.section} id="values">
      <div className={styles.container}>
        <h2 className={styles.title}>ערכי הליבה שלנו</h2>
        <div className={styles.grid}>
          {values.map((value, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
