import { useContent } from '@/context/ContentContext'
import styles from './Team.module.css'

const avatars = ['👨‍💻', '👩‍🔧', '👨‍💼', '👩‍🎨', '👨‍🔬', '👩‍💻', '👨‍🏭', '👩‍🚀', '👨‍🎓', '👩‍🔧']

const Team = () => {
  const { teamMembers } = useContent()

  return (
    <section className={styles.section} id="team">
      <div className={styles.container}>
        <h2 className={styles.title}>חברי הקבוצה שלנו</h2>
        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.avatar}>{avatars[index]}</div>
              <div className={styles.name}>{member.name || `חבר ${index + 1}`}</div>
              <div className={styles.role}>{member.role || 'תפקיד'}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
