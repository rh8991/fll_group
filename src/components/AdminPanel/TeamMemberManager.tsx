import { useState, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import styles from "./TeamMemberManager.module.css";

interface TeamMemberManagerProps {
  onClose: () => void;
}

const TeamMemberManager: React.FC<TeamMemberManagerProps> = ({ onClose }) => {
  const { teamMembers, updateContent } = useContent();
  const [members, setMembers] = useState<{ name: string; role: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");

  useEffect(() => {
    setMembers(teamMembers || []);
  }, [teamMembers]);

  const handleAddMember = () => {
    const newMember = { name: "", role: "" };
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    setEditingIndex(updatedMembers.length - 1);
    setEditName("");
    setEditRole("");
  };

  const handleRemoveMember = (index: number) => {
    if (
      confirm(
        `האם אתה בטוח שברצונך למחוק את ${members[index].name || `חבר ${index + 1}`}?`,
      )
    ) {
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);
      updateContent("teamMembers", updatedMembers);
    }
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditName(members[index].name);
    setEditRole(members[index].role);
  };

  const handleSaveEdit = (index: number) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { name: editName, role: editRole };
    setMembers(updatedMembers);
    updateContent("teamMembers", updatedMembers);
    setEditingIndex(null);
    setEditName("");
    setEditRole("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditName("");
    setEditRole("");
  };

  const avatars = [
    "👨‍💻",
    "👩‍🔧",
    "👨‍💼",
    "👩‍🎨",
    "👨‍🔬",
    "👩‍💻",
    "👨‍🏭",
    "👩‍🚀",
    "👨‍🎓",
    "👩‍🔧",
    "👨‍🎤",
    "👩‍🏫",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>ניהול חברי הקבוצה</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ← חזור
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.controls}>
          <button className={styles.addButton} onClick={handleAddMember}>
            ➕ הוסף חבר קבוצה
          </button>
          <p className={styles.hint}>סך הכל: {members.length} חברים</p>
        </div>

        {members.length === 0 ? (
          <div className={styles.empty}>
            <p>אין חברי קבוצה. לחץ על "הוסף חבר קבוצה" כדי להתחיל.</p>
          </div>
        ) : (
          <div className={styles.membersList}>
            {members.map((member, index) => (
              <div key={index} className={styles.memberCard}>
                <div className={styles.avatar}>
                  {avatars[index % avatars.length]}
                </div>

                {editingIndex === index ? (
                  <div className={styles.editForm}>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="שם חבר הקבוצה"
                      className={styles.input}
                      autoFocus
                    />
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      placeholder="תפקיד"
                      className={styles.input}
                    />
                    <div className={styles.editActions}>
                      <button
                        className={styles.saveBtn}
                        onClick={() => handleSaveEdit(index)}
                      >
                        ✓ שמור
                      </button>
                      <button
                        className={styles.cancelBtn}
                        onClick={handleCancelEdit}
                      >
                        ✕ ביטול
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.memberInfo}>
                    <div className={styles.memberName}>
                      {member.name || `חבר ${index + 1}`}
                    </div>
                    <div className={styles.memberRole}>
                      {member.role || "תפקיד לא מוגדר"}
                    </div>
                    <div className={styles.memberActions}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleStartEdit(index)}
                        title="ערוך"
                      >
                        ✏️ ערוך
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleRemoveMember(index)}
                        title="מחק"
                      >
                        🗑️ מחק
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMemberManager;
