import { useState } from "react";
import { useContent } from "@/context/ContentContext";
import styles from "./ImageUpload.module.css";

interface ImageUploadProps {
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onClose }) => {
  const { galleryImages = [], updateContent } = useContent();
  const [uploading, setUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("❌ אנא בחר קובץ תמונה בלבד");
      return;
    }

    // Validate file size (max 2MB for GitHub)
    if (file.size > 2 * 1024 * 1024) {
      alert("❌ גודל הקובץ חייב להיות קטן מ-2MB");
      return;
    }

    if (!newTitle.trim()) {
      alert("❌ אנא הכנס כותרת לתמונה");
      return;
    }

    setUploading(true);
    try {
      // Convert to base64 and store in Firestore (simple solution)
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageUrl = event.target?.result as string;

        const updatedImages = [
          ...galleryImages,
          { url: imageUrl, title: newTitle.trim() },
        ];

        await updateContent("galleryImages", updatedImages);
        alert("✅ התמונה נוספה בהצלחה!");
        setNewTitle("");
        e.target.value = ""; // Reset file input
        setUploading(false);
      };
      reader.onerror = () => {
        alert("❌ שגיאה בקריאת התמונה");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ שגיאה בהעלאת התמונה. אנא נסה שוב.");
      setUploading(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!confirm("האם אתה בטוח שברצונך למחוק תמונה זו?")) return;

    try {
      const updatedImages = galleryImages.filter((_, i) => i !== index);
      await updateContent("galleryImages", updatedImages);
      alert("✅ התמונה נמחקה בהצלחה!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ שגיאה במחיקת התמונה.");
    }
  };

  const handleUpdateTitle = async (index: number, newTitle: string) => {
    const updatedImages = [...galleryImages];
    updatedImages[index].title = newTitle;
    await updateContent("galleryImages", updatedImages);
    alert("✅ הכותרת עודכנה!");
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>🖼️ ניהול גלריית תמונות</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          סגור
        </button>
      </div>

      <div className={styles.uploadArea}>
        <h4>העלאת תמונה חדשה</h4>
        <input
          type="text"
          placeholder="כותרת התמונה"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={styles.titleInput}
        />
        <label className={styles.fileLabel}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className={styles.fileInput}
          />
          {uploading ? "מעלה..." : "📁 בחר תמונה"}
        </label>
        <p className={styles.hint}>
          גודל מקסימלי: 2MB | פורמטים: JPG, PNG, GIF | התמונות נשמרות בענן
        </p>
      </div>

      <div className={styles.gallery}>
        <h4>תמונות בגלריה ({galleryImages.length})</h4>
        {galleryImages.length === 0 ? (
          <p className={styles.empty}>אין תמונות בגלריה. העלה תמונה ראשונה!</p>
        ) : (
          <div className={styles.imageGrid}>
            {galleryImages.map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <img src={image.url} alt={image.title} />
                <input
                  type="text"
                  value={image.title}
                  onChange={(e) => handleUpdateTitle(index, e.target.value)}
                  className={styles.imageTitle}
                />
                <button
                  onClick={() => handleDelete(index)}
                  className={styles.deleteBtn}
                >
                  🗑️ מחק
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
