import { useState, useEffect } from 'react'
import { useContent } from '@/context/ContentContext'
import styles from './AdminPanel.module.css'

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { aboutText, problemText, solutionText, implementationText, companyLink, teamMembers, updateContent } = useContent()

  const [formData, setFormData] = useState({
    aboutText: '',
    problemText: '',
    solutionText: '',
    implementationText: '',
    companyLink: '',
    teamMembers: Array(10).fill({ name: '', role: '' })
  })

  useEffect(() => {
    if (isOpen) {
      setFormData({
        aboutText,
        problemText,
        solutionText,
        implementationText,
        companyLink,
        teamMembers: [...teamMembers]
      })
    }
  }, [isOpen, aboutText, problemText, solutionText, implementationText, companyLink, teamMembers])

  const handleSave = (type: string) => {
    switch(type) {
      case 'about':
        updateContent('aboutText', formData.aboutText)
        alert('✅ תיאור הקבוצה נשמר בהצלחה!')
        break
      case 'problem':
        updateContent('problemText', formData.problemText)
        alert('✅ תיאור הבעיה נשמר בהצלחה!')
        break
      case 'solution':
        updateContent('solutionText', formData.solutionText)
        alert('✅ תיאור הפתרון נשמר בהצלחה!')
        break
      case 'implementation':
        updateContent('implementationText', formData.implementationText)
        alert('✅ תיאור היישום נשמר בהצלחה!')
        break
      case 'companyLink':
        if (formData.companyLink && !formData.companyLink.startsWith('http')) {
          alert('❌ כתובת האתר חייבת להתחיל ב-http:// או https://')
          return
        }
        updateContent('companyLink', formData.companyLink)
        alert('✅ קישור לאתר החברה נשמר בהצלחה!')
        break
      case 'team':
        updateContent('teamMembers', formData.teamMembers)
        alert('✅ חברי הצוות נשמרו בהצלחה!')
        break
    }
  }

  const handleTeamMemberChange = (index: number, field: 'name' | 'role', value: string) => {
    const newMembers = [...formData.teamMembers]
    newMembers[index] = { ...newMembers[index], [field]: value }
    setFormData({ ...formData, teamMembers: newMembers })
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>לוח בקרת מנהל - עריכת תוכן האתר</h2>
          <button className={styles.closeButton} onClick={onClose}>✕ סגור</button>
        </div>

        <div className={styles.content}>
          {/* About Section */}
          <div className={styles.section}>
            <h3>📝 אודות הקבוצה</h3>
            <textarea
              value={formData.aboutText}
              onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
              placeholder="הכנס תיאור של הקבוצה..."
              rows={5}
            />
            <button className={styles.saveButton} onClick={() => handleSave('about')}>שמור שינויים</button>
          </div>

          {/* Problem Section */}
          <div className={styles.section}>
            <h3>🔍 הבעיה שבחרנו</h3>
            <textarea
              value={formData.problemText}
              onChange={(e) => setFormData({ ...formData, problemText: e.target.value })}
              placeholder="תאר את הבעיה..."
              rows={5}
            />
            <button className={styles.saveButton} onClick={() => handleSave('problem')}>שמור שינויים</button>
          </div>

          {/* Solution Section */}
          <div className={styles.section}>
            <h3>💡 הפתרון שלנו</h3>
            <textarea
              value={formData.solutionText}
              onChange={(e) => setFormData({ ...formData, solutionText: e.target.value })}
              placeholder="תאר את הפתרון..."
              rows={5}
            />
            <button className={styles.saveButton} onClick={() => handleSave('solution')}>שמור שינויים</button>
          </div>

          {/* Implementation Section */}
          <div className={styles.section}>
            <h3>⚙️ דרך היישום</h3>
            <textarea
              value={formData.implementationText}
              onChange={(e) => setFormData({ ...formData, implementationText: e.target.value })}
              placeholder="תאר כיצד הפתרון ייושם..."
              rows={5}
            />
            <button className={styles.saveButton} onClick={() => handleSave('implementation')}>שמור שינויים</button>
          </div>

          {/* Company Link */}
          <div className={styles.section}>
            <h3>🌐 קישור לאתר החברה</h3>
            <input
              type="url"
              value={formData.companyLink}
              onChange={(e) => setFormData({ ...formData, companyLink: e.target.value })}
              placeholder="https://example.com"
            />
            <p className={styles.hint}>הכנס את כתובת האתר המלאה (כולל https://)</p>
            <button className={styles.saveButton} onClick={() => handleSave('companyLink')}>שמור שינויים</button>
          </div>

          {/* Team Members */}
          <div className={styles.section}>
            <h3>👥 עריכת חברי צוות</h3>
            <p className={styles.hint}>הכנס שמות והתפקידים של 10 חברי הקבוצה</p>
            {formData.teamMembers.map((member, index) => (
              <div key={index} className={styles.memberInput}>
                <label>חבר {index + 1}:</label>
                <div className={styles.memberFields}>
                  <input
                    type="text"
                    placeholder="שם"
                    value={member.name}
                    onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="תפקיד"
                    value={member.role}
                    onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button className={styles.saveButton} onClick={() => handleSave('team')}>שמור שינויים</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
