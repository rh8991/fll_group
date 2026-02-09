import { useState, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import ImageUpload from "./ImageUpload";
import TeamMemberManager from "./TeamMemberManager";
import ModelUpload from "./ModelUpload";
import styles from "./AdminPanel.module.css";

interface CardItem {
  icon: string;
  title: string;
  description: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface AdminFormData {
  aboutText: string;
  problemText: string;
  solutionText: string;
  implementationText: string;
  companyLink: string;
  headerTitle: string;
  heroSubtitle: string;
  footerLocation: string;
  footerSeason: string;
  footerCopyright: string;
  robotDesignTitle: string;
  robotDesignSubtitle: string;
  robotDesignCards: CardItem[];
  gameStrategyTitle: string;
  gameStrategySubtitle: string;
  gameStrategyCards: CardItem[];
  coreValuesTitle: string;
  coreValues: CardItem[];
  companyHeroTitle: string;
  companyHeroTagline: string;
  companyHeroSubtitle: string;
  companyAboutText: string;
  companyFeatures: CardItem[];
  companyContactEmail: string;
  companyContactPhone: string;
  companyContactWebsite: string;
  companyContactText: string;
  headerCompanyTitle: string;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    light: string;
    text: string;
    headerBg: string;
    headerText: string;
    footerBg: string;
    footerText: string;
    companyPrimary: string;
    companySecondary: string;
    companyAccent: string;
  };
}

type TabType =
  | "homepage"
  | "company"
  | "gallery"
  | "team"
  | "theme"
  | "archaeology";

const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const context = useContent();

  const [activeTab, setActiveTab] = useState<TabType>("homepage");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showTeamManager, setShowTeamManager] = useState(false);

  const [formData, setFormData] = useState<AdminFormData>({
    // Homepage content
    aboutText: "",
    problemText: "",
    solutionText: "",
    implementationText: "",
    companyLink: "",
    headerTitle: "",
    heroSubtitle: "",
    footerLocation: "",
    footerSeason: "",
    footerCopyright: "",
    // Robot Design Section
    robotDesignTitle: "",
    robotDesignSubtitle: "",
    robotDesignCards: [],
    // Game Strategy Section
    gameStrategyTitle: "",
    gameStrategySubtitle: "",
    gameStrategyCards: [],
    // Core Values Section
    coreValuesTitle: "",
    coreValues: [],
    // Company page content
    companyHeroTitle: "",
    companyHeroTagline: "",
    companyHeroSubtitle: "",
    companyAboutText: "",
    companyFeatures: [],
    companyContactEmail: "",
    companyContactPhone: "",
    companyContactWebsite: "",
    companyContactText: "",
    headerCompanyTitle: "",
    // Theme
    themeColors: {
      primary: "#2f3a7e",
      secondary: "#6b4f2c",
      accent: "#8ea19e",
      dark: "#121826",
      light: "#f3efe6",
      text: "#fcf6f6",
      headerBg: "#2f3a7e",
      headerText: "#ffffff",
      footerBg: "#121826",
      footerText: "#f3efe6",
      companyPrimary: "#1a5f7a",
      companySecondary: "#159895",
      companyAccent: "#57c5b6",
    },
  });

  useEffect(() => {
    if (isOpen && context) {
      setFormData({
        aboutText: context.aboutText || "",
        problemText: context.problemText || "",
        solutionText: context.solutionText || "",
        implementationText: context.implementationText || "",
        companyLink: context.companyLink || "",
        headerTitle: context.headerTitle || "",
        heroSubtitle: context.heroSubtitle || "",
        footerLocation: context.footerLocation || "",
        footerSeason: context.footerSeason || "",
        footerCopyright: context.footerCopyright || "",
        robotDesignTitle: context.robotDesignTitle || "",
        robotDesignSubtitle: context.robotDesignSubtitle || "",
        robotDesignCards: context.robotDesignCards || [],
        gameStrategyTitle: context.gameStrategyTitle || "",
        gameStrategySubtitle: context.gameStrategySubtitle || "",
        gameStrategyCards: context.gameStrategyCards || [],
        coreValuesTitle: context.coreValuesTitle || "",
        coreValues: context.coreValues || [],
        companyHeroTitle: context.companyHeroTitle || "",
        companyHeroTagline: context.companyHeroTagline || "",
        companyHeroSubtitle: context.companyHeroSubtitle || "",
        companyAboutText: context.companyAboutText || "",
        companyFeatures: context.companyFeatures || [],
        companyContactEmail: context.companyContactEmail || "",
        companyContactPhone: context.companyContactPhone || "",
        companyContactWebsite: context.companyContactWebsite || "",
        companyContactText: context.companyContactText || "",
        headerCompanyTitle: context.headerCompanyTitle || "",
        themeColors: context.themeColors || {
          primary: "#2f3a7e",
          secondary: "#6b4f2c",
          accent: "#8ea19e",
          dark: "#121826",
          light: "#f3efe6",
          text: "#fcf6f6",
        },
      });
    }
  }, [isOpen, context]);

  const handleSaveAll = async () => {
    if (!context) return;

    try {
      // Save all homepage content
      await context.updateContent("aboutText", formData.aboutText);
      await context.updateContent("problemText", formData.problemText);
      await context.updateContent("solutionText", formData.solutionText);
      await context.updateContent(
        "implementationText",
        formData.implementationText,
      );
      await context.updateContent("companyLink", formData.companyLink);
      await context.updateContent("headerTitle", formData.headerTitle);
      await context.updateContent("heroSubtitle", formData.heroSubtitle);
      await context.updateContent("footerLocation", formData.footerLocation);
      await context.updateContent("footerSeason", formData.footerSeason);
      await context.updateContent("footerCopyright", formData.footerCopyright);

      // Save robot design section
      await context.updateContent(
        "robotDesignTitle",
        formData.robotDesignTitle,
      );
      await context.updateContent(
        "robotDesignSubtitle",
        formData.robotDesignSubtitle,
      );
      await context.updateContent(
        "robotDesignCards",
        formData.robotDesignCards,
      );

      // Save game strategy section
      await context.updateContent(
        "gameStrategyTitle",
        formData.gameStrategyTitle,
      );
      await context.updateContent(
        "gameStrategySubtitle",
        formData.gameStrategySubtitle,
      );
      await context.updateContent(
        "gameStrategyCards",
        formData.gameStrategyCards,
      );

      // Save core values section
      await context.updateContent("coreValuesTitle", formData.coreValuesTitle);
      await context.updateContent("coreValues", formData.coreValues);

      // Save all company page content
      await context.updateContent(
        "companyHeroTitle",
        formData.companyHeroTitle,
      );
      await context.updateContent(
        "companyHeroTagline",
        formData.companyHeroTagline,
      );
      await context.updateContent(
        "companyHeroSubtitle",
        formData.companyHeroSubtitle,
      );
      await context.updateContent(
        "companyAboutText",
        formData.companyAboutText,
      );
      await context.updateContent("companyFeatures", formData.companyFeatures);
      await context.updateContent(
        "companyContactEmail",
        formData.companyContactEmail,
      );
      await context.updateContent(
        "companyContactPhone",
        formData.companyContactPhone,
      );
      await context.updateContent(
        "companyContactWebsite",
        formData.companyContactWebsite,
      );
      await context.updateContent(
        "companyContactText",
        formData.companyContactText,
      );
      await context.updateContent(
        "headerCompanyTitle",
        formData.headerCompanyTitle,
      );

      // Save theme
      await context.updateContent("themeColors", formData.themeColors);

      alert("✅ כל השינויים נשמרו בהצלחה!");
    } catch (error) {
      alert("❌ שגיאה בשמירת השינויים");
      console.error(error);
    }
  };

  const handleColorChange = (
    colorKey: keyof typeof formData.themeColors,
    value: string,
  ) => {
    setFormData({
      ...formData,
      themeColors: { ...formData.themeColors, [colorKey]: value },
    });
  };

  const resetColors = () => {
    const defaultColors = {
      primary: "#2f3a7e",
      secondary: "#6b4f2c",
      accent: "#8ea19e",
      dark: "#121826",
      light: "#f3efe6",
      text: "#fcf6f6",
      headerBg: "#2f3a7e",
      headerText: "#ffffff",
      footerBg: "#121826",
      footerText: "#f3efe6",
      companyPrimary: "#1a5f7a",
      companySecondary: "#159895",
      companyAccent: "#57c5b6",
    };
    setFormData({ ...formData, themeColors: defaultColors });
  };

  const handleFeatureChange = (
    index: number,
    field: "icon" | "title" | "description",
    value: string,
  ) => {
    const newFeatures = [...formData.companyFeatures];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, companyFeatures: newFeatures });
  };

  const handleCardChange = (
    cardArray: CardItem[],
    index: number,
    field: "icon" | "title" | "description",
    value: string,
  ) => {
    const newCards = [...cardArray];
    newCards[index] = { ...newCards[index], [field]: value };
    return newCards;
  };

  const addFeature = () => {
    const newFeatures = [
      ...formData.companyFeatures,
      { icon: "", title: "", description: "" },
    ];
    setFormData({ ...formData, companyFeatures: newFeatures });
  };

  const deleteFeature = (index: number) => {
    if (formData.companyFeatures.length <= 1) {
      alert("חייב להישאר לפחות תכונה אחת!");
      return;
    }
    const newFeatures = formData.companyFeatures.filter((_, i) => i !== index);
    setFormData({ ...formData, companyFeatures: newFeatures });
  };

  const addCard = (
    cardArray: any[],
    setterKey:
      | "robotDesignCards"
      | "gameStrategyCards"
      | "coreValues"
      | "companyFeatures",
  ) => {
    const newCards = [...cardArray, { icon: "", title: "", description: "" }];
    setFormData({ ...formData, [setterKey]: newCards });
    // Auto-save when adding a card
    context.updateContent(setterKey, newCards);
  };

  const deleteCard = (
    cardArray: any[],
    setterKey:
      | "robotDesignCards"
      | "gameStrategyCards"
      | "coreValues"
      | "companyFeatures",
    index: number,
  ) => {
    if (cardArray.length <= 1) {
      alert("חייב להישאר לפחות כרטיסייה אחת!");
      return;
    }
    const newCards = cardArray.filter((_, i) => i !== index);
    setFormData({ ...formData, [setterKey]: newCards });
    // Auto-save when deleting a card
    context.updateContent(setterKey, newCards);
  };

  const addBulletPoint = (fieldName: keyof typeof formData) => {
    const currentValue = formData[fieldName] as string;
    const newValue = currentValue + (currentValue ? "\n• " : "• ");
    setFormData({ ...formData, [fieldName]: newValue });
  };

  if (!isOpen) return null;

  if (showImageUpload) {
    return (
      <div className={styles.overlay}>
        <div className={styles.panel}>
          <ImageUpload onClose={() => setShowImageUpload(false)} />
        </div>
      </div>
    );
  }

  if (showTeamManager) {
    return (
      <div className={styles.overlay}>
        <div className={styles.panel}>
          <TeamMemberManager onClose={() => setShowTeamManager(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>לוח בקרת מנהל - עריכת תוכן האתר</h2>
          <div className={styles.headerButtons}>
            <button className={styles.saveAllButton} onClick={handleSaveAll}>
              💾 שמור הכל
            </button>
            <button className={styles.logoutButton} onClick={onLogout}>
              🚪 התנתק
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              ✕ סגור
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabNav}>
          <button
            className={`${styles.tabButton} ${activeTab === "homepage" ? styles.active : ""}`}
            onClick={() => setActiveTab("homepage")}
          >
            🏠 עמוד הבית
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "company" ? styles.active : ""}`}
            onClick={() => setActiveTab("company")}
          >
            🏢 עמוד החברה
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "gallery" ? styles.active : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            🖼️ גלריה
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "team" ? styles.active : ""}`}
            onClick={() => setActiveTab("team")}
          >
            👥 צוות
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "theme" ? styles.active : ""}`}
            onClick={() => setActiveTab("theme")}
          >
            🎨 עיצוב
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "archaeology" ? styles.active : ""}`}
            onClick={() => setActiveTab("archaeology")}
          >
            🏛️ דמו ארכיאולוגיה
          </button>
        </div>

        <div className={styles.content}>
          {/* HOMEPAGE TAB */}
          {activeTab === "homepage" && (
            <>
              {/* Header */}
              <div className={styles.section}>
                <h3>📌 כותרת אתר הקבוצה</h3>
                <input
                  type="text"
                  value={formData.headerTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, headerTitle: e.target.value })
                  }
                  placeholder="The Shimis"
                />
              </div>

              {/* Hero Subtitle */}
              <div className={styles.section}>
                <h3>✨ תיאור בעמוד הבית (Hero Subtitle)</h3>
                <textarea
                  value={formData.heroSubtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, heroSubtitle: e.target.value })
                  }
                  placeholder="חושפים את העבר, בונים את העתיד - ארכיאולוגיה בעידן הדיגיטלי"
                  rows={2}
                />
              </div>

              {/* About Section */}
              <div className={styles.section}>
                <h3>📝 אודות הקבוצה</h3>
                <div className={styles.textareaHeader}>
                  <button
                    className={styles.bulletButton}
                    onClick={() => addBulletPoint("aboutText")}
                    title="הוסף נקודה"
                  >
                    • הוסף נקודה
                  </button>
                </div>
                <textarea
                  value={formData.aboutText}
                  onChange={(e) =>
                    setFormData({ ...formData, aboutText: e.target.value })
                  }
                  placeholder="הכנס תיאור של הקבוצה..."
                  rows={5}
                />
              </div>

              {/* Core Values Section */}
              <div className={styles.section}>
                <h3>💎 ערכי הליבה</h3>
                <div className={styles.inputGroup}>
                  <label>כותרת:</label>
                  <input
                    type="text"
                    value={formData.coreValuesTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coreValuesTitle: e.target.value,
                      })
                    }
                    placeholder="ערכי הליבה שלנו"
                  />
                </div>
                <div className={styles.sectionHeader}>
                  <h4>🎴 ערכים ({formData.coreValues.length})</h4>
                  <button
                    className={styles.addButton}
                    onClick={() => addCard(formData.coreValues, "coreValues")}
                    type="button"
                  >
                    ➕ הוסף ערך
                  </button>
                </div>
                {formData.coreValues.map((value, index) => (
                  <div key={index} className={styles.featureItem}>
                    <div className={styles.featureHeader}>
                      <h4>ערך {index + 1}</h4>
                      <button
                        className={styles.deleteButton}
                        onClick={() =>
                          deleteCard(formData.coreValues, "coreValues", index)
                        }
                        type="button"
                        title="מחק ערך"
                      >
                        🗑️ מחק
                      </button>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>אימוג'י:</label>
                      <input
                        type="text"
                        value={value.icon}
                        onChange={(e) => {
                          const newValues = handleCardChange(
                            formData.coreValues,
                            index,
                            "icon",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            coreValues: newValues,
                          });
                        }}
                        placeholder="🤝"
                        maxLength={2}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>כותרת:</label>
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => {
                          const newValues = handleCardChange(
                            formData.coreValues,
                            index,
                            "title",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            coreValues: newValues,
                          });
                        }}
                        placeholder="כבוד הדדי"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <div className={styles.textareaHeader}>
                        <label>תיאור:</label>
                        <button
                          className={styles.bulletButton}
                          onClick={() => {
                            const newValues = handleCardChange(
                              formData.coreValues,
                              index,
                              "description",
                              value.description +
                                (value.description ? "\n• " : "• "),
                            );
                            setFormData({
                              ...formData,
                              coreValues: newValues,
                            });
                          }}
                          title="הוסף נקודה"
                        >
                          • הוסף נקודה
                        </button>
                      </div>
                      <textarea
                        value={value.description}
                        onChange={(e) => {
                          const newValues = handleCardChange(
                            formData.coreValues,
                            index,
                            "description",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            coreValues: newValues,
                          });
                        }}
                        placeholder="אנחנו מכבדים את כל חברי הצוות..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem Section */}
              <div className={styles.section}>
                <h3>🔍 הבעיה שבחרנו</h3>
                <div className={styles.textareaHeader}>
                  <button
                    className={styles.bulletButton}
                    onClick={() => addBulletPoint("problemText")}
                    title="הוסף נקודה"
                  >
                    • הוסף נקודה
                  </button>
                </div>
                <textarea
                  value={formData.problemText}
                  onChange={(e) =>
                    setFormData({ ...formData, problemText: e.target.value })
                  }
                  placeholder="תאר את הבעיה..."
                  rows={5}
                />
              </div>

              {/* Solution Section */}
              <div className={styles.section}>
                <h3>💡 הפתרון שלנו</h3>
                <div className={styles.textareaHeader}>
                  <button
                    className={styles.bulletButton}
                    onClick={() => addBulletPoint("solutionText")}
                    title="הוסף נקודה"
                  >
                    • הוסף נקודה
                  </button>
                </div>
                <textarea
                  value={formData.solutionText}
                  onChange={(e) =>
                    setFormData({ ...formData, solutionText: e.target.value })
                  }
                  placeholder="תאר את הפתרון..."
                  rows={5}
                />
              </div>

              {/* Implementation Section */}
              <div className={styles.section}>
                <h3>⚙️ דרך היישום</h3>
                <div className={styles.textareaHeader}>
                  <button
                    className={styles.bulletButton}
                    onClick={() => addBulletPoint("implementationText")}
                    title="הוסף נקודה"
                  >
                    • הוסף נקודה
                  </button>
                </div>
                <textarea
                  value={formData.implementationText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      implementationText: e.target.value,
                    })
                  }
                  placeholder="תאר כיצד הפתרון ייושם..."
                  rows={5}
                />
              </div>

              {/* Robot Design Section */}
              <div className={styles.section}>
                <h3>🦾 תכנון הרובוט</h3>
                <div className={styles.inputGroup}>
                  <label>כותרת:</label>
                  <input
                    type="text"
                    value={formData.robotDesignTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        robotDesignTitle: e.target.value,
                      })
                    }
                    placeholder="תכנון הרובוט שלנו"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>תיאור או סברה:</label>
                  <textarea
                    value={formData.robotDesignSubtitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        robotDesignSubtitle: e.target.value,
                      })
                    }
                    placeholder="פיתחנו רובוט מודולרי עם זרועות מתחלפות..."
                    rows={2}
                  />
                </div>
                <div className={styles.sectionHeader}>
                  <h4>
                    🎴 כרטיסיות תכנון רובוט ({formData.robotDesignCards.length})
                  </h4>
                  <button
                    className={styles.addButton}
                    onClick={() =>
                      addCard(formData.robotDesignCards, "robotDesignCards")
                    }
                    type="button"
                  >
                    ➕ הוסף כרטיסייה
                  </button>
                </div>
                {formData.robotDesignCards.map((card, index) => (
                  <div key={index} className={styles.featureItem}>
                    <div className={styles.featureHeader}>
                      <h4>כרטיסייה {index + 1}</h4>
                      <button
                        className={styles.deleteButton}
                        onClick={() =>
                          deleteCard(
                            formData.robotDesignCards,
                            "robotDesignCards",
                            index,
                          )
                        }
                        type="button"
                        title="מחק כרטיסייה"
                      >
                        🗑️ מחק
                      </button>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>אימוג'י:</label>
                      <input
                        type="text"
                        value={card.icon}
                        onChange={(e) => {
                          const newCards = handleCardChange(
                            formData.robotDesignCards,
                            index,
                            "icon",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            robotDesignCards: newCards,
                          });
                        }}
                        placeholder="🏗️"
                        maxLength={2}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>כותרת:</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const newCards = handleCardChange(
                            formData.robotDesignCards,
                            index,
                            "title",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            robotDesignCards: newCards,
                          });
                        }}
                        placeholder="מבנה בסיס חזק"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <div className={styles.textareaHeader}>
                        <label>תיאור:</label>
                        <button
                          className={styles.bulletButton}
                          onClick={() => {
                            const newCards = handleCardChange(
                              formData.robotDesignCards,
                              index,
                              "description",
                              card.description +
                                (card.description ? "\n• " : "• "),
                            );
                            setFormData({
                              ...formData,
                              robotDesignCards: newCards,
                            });
                          }}
                          title="הוסף נקודה"
                        >
                          • הוסף נקודה
                        </button>
                      </div>
                      <textarea
                        value={card.description}
                        onChange={(e) => {
                          const newCards = handleCardChange(
                            formData.robotDesignCards,
                            index,
                            "description",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            robotDesignCards: newCards,
                          });
                        }}
                        placeholder="בסיס יציב וחזק..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Game Strategy Section */}
              <div className={styles.section}>
                <h3>🎯 אסטרטגיית המשחק</h3>
                <div className={styles.inputGroup}>
                  <label>כותרת:</label>
                  <input
                    type="text"
                    value={formData.gameStrategyTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gameStrategyTitle: e.target.value,
                      })
                    }
                    placeholder="אסטרטגיית המשחק שלנו"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>תיאור או סברה:</label>
                  <textarea
                    value={formData.gameStrategySubtitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gameStrategySubtitle: e.target.value,
                      })
                    }
                    placeholder="בחרנו להתמקד במשימות עם ניקוד גבוה..."
                    rows={2}
                  />
                </div>
                <div className={styles.sectionHeader}>
                  <h4>
                    🎴 כרטיסיות אסטרטגיה ({formData.gameStrategyCards.length})
                  </h4>
                  <button
                    className={styles.addButton}
                    onClick={() =>
                      addCard(formData.gameStrategyCards, "gameStrategyCards")
                    }
                    type="button"
                  >
                    ➕ הוסף כרטיסייה
                  </button>
                </div>
                {formData.gameStrategyCards.map((card, index) => (
                  <div key={index} className={styles.featureItem}>
                    <div className={styles.featureHeader}>
                      <h4>כרטיסייה {index + 1}</h4>
                      <button
                        className={styles.deleteButton}
                        onClick={() =>
                          deleteCard(
                            formData.gameStrategyCards,
                            "gameStrategyCards",
                            index,
                          )
                        }
                        type="button"
                        title="מחק כרטיסייה"
                      >
                        🗑️ מחק
                      </button>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>אימוג'י:</label>
                      <input
                        type="text"
                        value={card.icon}
                        onChange={(e) => {
                          const newCards = handleCardChange(
                            formData.gameStrategyCards,
                            index,
                            "icon",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            gameStrategyCards: newCards,
                          });
                        }}
                        placeholder="🎯"
                        maxLength={2}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>כותרת:</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const newCards = handleCardChange(
                            formData.gameStrategyCards,
                            index,
                            "title",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            gameStrategyCards: newCards,
                          });
                        }}
                        placeholder="משימות עדיפות ראשונה"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <div className={styles.textareaHeader}>
                        <label>תיאור:</label>
                        <button
                          className={styles.bulletButton}
                          onClick={() => {
                            const newCards = handleCardChange(
                              formData.gameStrategyCards,
                              index,
                              "description",
                              card.description +
                                (card.description ? "\n• " : "• "),
                            );
                            setFormData({
                              ...formData,
                              gameStrategyCards: newCards,
                            });
                          }}
                          title="הוסף נקודה"
                        >
                          • הוסף נקודה
                        </button>
                      </div>
                      <textarea
                        value={card.description}
                        onChange={(e) => {
                          const newCards = handleCardChange(
                            formData.gameStrategyCards,
                            index,
                            "description",
                            e.target.value,
                          );
                          setFormData({
                            ...formData,
                            gameStrategyCards: newCards,
                          });
                        }}
                        placeholder="התמקדות בנקודות גבוהות..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Link */}
              <div className={styles.section}>
                <h3>🌐 קישור לאתר החברה</h3>
                <input
                  type="url"
                  value={formData.companyLink}
                  onChange={(e) =>
                    setFormData({ ...formData, companyLink: e.target.value })
                  }
                  placeholder="https://example.com"
                />
                <p className={styles.hint}>
                  הכנס את כתובת האתר המלאה (כולל https://)
                </p>
              </div>

              {/* Footer Section */}
              <div className={styles.section}>
                <h3>📄 פוטר</h3>

                <div className={styles.inputGroup}>
                  <label>מיקום:</label>
                  <input
                    type="text"
                    value={formData.footerLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        footerLocation: e.target.value,
                      })
                    }
                    placeholder="📍 הטכנודע, חדרה"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>עונה ותחרות:</label>
                  <input
                    type="text"
                    value={formData.footerSeason}
                    onChange={(e) =>
                      setFormData({ ...formData, footerSeason: e.target.value })
                    }
                    placeholder="🏛️ FIRST LEGO League - עונת UNEARTHED 2026"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>זכויות יוצרים וערכים:</label>
                  <textarea
                    value={formData.footerCopyright}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        footerCopyright: e.target.value,
                      })
                    }
                    placeholder="© 2024-2025 The Shimis | כל הזכויות שמורות"
                    rows={3}
                  />
                </div>
              </div>
            </>
          )}

          {/* COMPANY TAB */}
          {activeTab === "company" && (
            <>
              {/* Company Header */}
              <div className={styles.section}>
                <h3>📌 כותרת אתר החברה</h3>
                <input
                  type="text"
                  value={formData.headerCompanyTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      headerCompanyTitle: e.target.value,
                    })
                  }
                  placeholder="ArcheoVision AI"
                />
              </div>

              {/* Hero Section */}
              <div className={styles.section}>
                <h3>🎯 Hero - מסך פתיחה</h3>

                <div className={styles.inputGroup}>
                  <label>כותרת ראשית:</label>
                  <input
                    type="text"
                    value={formData.companyHeroTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyHeroTitle: e.target.value,
                      })
                    }
                    placeholder="ArcheoVision AI"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>משפט תיאור קצר:</label>
                  <input
                    type="text"
                    value={formData.companyHeroTagline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyHeroTagline: e.target.value,
                      })
                    }
                    placeholder="בינה מלאכותית לארכיאולוגיה נגישה"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>תיאור מורחב:</label>
                  <textarea
                    value={formData.companyHeroSubtitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyHeroSubtitle: e.target.value,
                      })
                    }
                    placeholder="המערכת הראשונה בישראל..."
                    rows={3}
                  />
                </div>
              </div>

              {/* About Company */}
              <div className={styles.section}>
                <h3>🏢 אודות החברה</h3>
                <div className={styles.textareaHeader}>
                  <button
                    className={styles.bulletButton}
                    onClick={() => addBulletPoint("companyAboutText")}
                    title="הוסף נקודה"
                  >
                    • הוסף נקודה
                  </button>
                </div>
                <textarea
                  value={formData.companyAboutText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyAboutText: e.target.value,
                    })
                  }
                  placeholder="תאר את החברה... השתמש ב-\n\n למעבר פסקה"
                  rows={8}
                />
                <p className={styles.hint}>השתמש ב-\n\n למעבר פסקה</p>
              </div>

              {/* Features */}
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3>
                    ✨ היכולות שלנו ({formData.companyFeatures.length} תכונות)
                  </h3>
                  <button
                    className={styles.addButton}
                    onClick={addFeature}
                    type="button"
                  >
                    ➕ הוסף תכונה
                  </button>
                </div>
                {formData.companyFeatures.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>
                    <div className={styles.featureHeader}>
                      <h4>תכונה {index + 1}</h4>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteFeature(index)}
                        type="button"
                        title="מחק תכונה"
                      >
                        🗑️ מחק
                      </button>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>אימוג'י:</label>
                      <input
                        type="text"
                        value={feature.icon}
                        onChange={(e) =>
                          handleFeatureChange(index, "icon", e.target.value)
                        }
                        placeholder="📱"
                        maxLength={2}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>כותרת:</label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) =>
                          handleFeatureChange(index, "title", e.target.value)
                        }
                        placeholder="צילום מהטלפון"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>תיאור:</label>
                      <textarea
                        value={feature.description}
                        onChange={(e) =>
                          handleFeatureChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="הפוך כל סמארטפון לכלי..."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className={styles.section}>
                <h3>📞 יצירת קשר</h3>

                <div className={styles.inputGroup}>
                  <label>דוא"ל:</label>
                  <input
                    type="email"
                    value={formData.companyContactEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyContactEmail: e.target.value,
                      })
                    }
                    placeholder="info@archeovision.ai"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>טלפון:</label>
                  <input
                    type="tel"
                    value={formData.companyContactPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyContactPhone: e.target.value,
                      })
                    }
                    placeholder="04-1234567"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>אתר אינטרנט:</label>
                  <input
                    type="text"
                    value={formData.companyContactWebsite}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyContactWebsite: e.target.value,
                      })
                    }
                    placeholder="www.archeovision.ai"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>טקסט קריאה לפעולה:</label>
                  <textarea
                    value={formData.companyContactText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyContactText: e.target.value,
                      })
                    }
                    placeholder="מעוניינים לשתף פעולה?"
                    rows={2}
                  />
                </div>
              </div>
            </>
          )}

          {/* GALLERY TAB */}
          {activeTab === "gallery" && (
            <div className={styles.section}>
              <h3>🖼️ ניהול תמונות</h3>
              <p className={styles.hint}>העלה, ערוך ומחק תמונות בגלריה</p>
              <button
                className={styles.saveButton}
                onClick={() => setShowImageUpload(true)}
              >
                פתח מנהל תמונות
              </button>
            </div>
          )}

          {/* TEAM TAB */}
          {activeTab === "team" && (
            <div className={styles.section}>
              <h3>👥 ניהול חברי צוות</h3>
              <p className={styles.hint}>הוסף, ערוך או הסר חברי קבוצה</p>
              <p className={styles.hint}>
                סך הכל: {context?.teamMembers?.length || 0} חברים
              </p>
              <button
                className={styles.manageButton}
                onClick={() => setShowTeamManager(true)}
              >
                ✏️ נהל חברי קבוצה
              </button>
            </div>
          )}

          {/* THEME TAB */}
          {activeTab === "theme" && (
            <div className={styles.section}>
              <h3>🎨 ניהול צבעי האתר</h3>
              <p className={styles.hint}>
                התאם את צבעי האתר לפי ההעדפות שלך - השינויים יופיעו בכל דפי האתר
              </p>

              <div className={styles.colorGrid}>
                <div className={styles.colorInput}>
                  <label>צבע ראשי (Primary)</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.primary}
                      onChange={(e) =>
                        handleColorChange("primary", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.primary}
                      onChange={(e) =>
                        handleColorChange("primary", e.target.value)
                      }
                      placeholder="#2f3a7e"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>צבע משני (Secondary)</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.secondary}
                      onChange={(e) =>
                        handleColorChange("secondary", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.secondary}
                      onChange={(e) =>
                        handleColorChange("secondary", e.target.value)
                      }
                      placeholder="#6b4f2c"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>צבע הדגשה (Accent)</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.accent}
                      onChange={(e) =>
                        handleColorChange("accent", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.accent}
                      onChange={(e) =>
                        handleColorChange("accent", e.target.value)
                      }
                      placeholder="#8ea19e"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>צבע רקע כהה (Dark)</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.dark}
                      onChange={(e) =>
                        handleColorChange("dark", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.dark}
                      onChange={(e) =>
                        handleColorChange("dark", e.target.value)
                      }
                      placeholder="#121826"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>צבע רקע בהיר (Light)</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.light}
                      onChange={(e) =>
                        handleColorChange("light", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.light}
                      onChange={(e) =>
                        handleColorChange("light", e.target.value)
                      }
                      placeholder="#f3efe6"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>צבע טקסט (Text)</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.text}
                      onChange={(e) =>
                        handleColorChange("text", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.text}
                      onChange={(e) =>
                        handleColorChange("text", e.target.value)
                      }
                      placeholder="#fcf6f6"
                    />
                  </div>
                </div>
              </div>

              <h4 className={styles.colorSectionTitle}>🎯 צבעי Header</h4>
              <div className={styles.colorGrid}>
                <div className={styles.colorInput}>
                  <label>רקע Header</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.headerBg}
                      onChange={(e) =>
                        handleColorChange("headerBg", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.headerBg}
                      onChange={(e) =>
                        handleColorChange("headerBg", e.target.value)
                      }
                      placeholder="#2f3a7e"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>טקסט Header</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.headerText}
                      onChange={(e) =>
                        handleColorChange("headerText", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.headerText}
                      onChange={(e) =>
                        handleColorChange("headerText", e.target.value)
                      }
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>

              <h4 className={styles.colorSectionTitle}>📄 צבעי Footer</h4>
              <div className={styles.colorGrid}>
                <div className={styles.colorInput}>
                  <label>רקע Footer</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.footerBg}
                      onChange={(e) =>
                        handleColorChange("footerBg", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.footerBg}
                      onChange={(e) =>
                        handleColorChange("footerBg", e.target.value)
                      }
                      placeholder="#121826"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>טקסט Footer</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.footerText}
                      onChange={(e) =>
                        handleColorChange("footerText", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.footerText}
                      onChange={(e) =>
                        handleColorChange("footerText", e.target.value)
                      }
                      placeholder="#f3efe6"
                    />
                  </div>
                </div>
              </div>

              <h4 className={styles.colorSectionTitle}>🏢 צבעי אתר החברה</h4>
              <div className={styles.colorGrid}>
                <div className={styles.colorInput}>
                  <label>צבע ראשי - חברה</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.companyPrimary}
                      onChange={(e) =>
                        handleColorChange("companyPrimary", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.companyPrimary}
                      onChange={(e) =>
                        handleColorChange("companyPrimary", e.target.value)
                      }
                      placeholder="#1a5f7a"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>צבע משני - חברה</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.companySecondary}
                      onChange={(e) =>
                        handleColorChange("companySecondary", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.companySecondary}
                      onChange={(e) =>
                        handleColorChange("companySecondary", e.target.value)
                      }
                      placeholder="#159895"
                    />
                  </div>
                </div>

                <div className={styles.colorInput}>
                  <label>צבע הדגשה - חברה</label>
                  <div className={styles.colorInputWrapper}>
                    <input
                      type="color"
                      value={formData.themeColors.companyAccent}
                      onChange={(e) =>
                        handleColorChange("companyAccent", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      value={formData.themeColors.companyAccent}
                      onChange={(e) =>
                        handleColorChange("companyAccent", e.target.value)
                      }
                      placeholder="#57c5b6"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.colorActions}>
                <button className={styles.resetButton} onClick={resetColors}>
                  אפס לברירת מחדל
                </button>
              </div>
            </div>
          )}

          {/* ARCHAEOLOGY TAB */}
          {activeTab === "archaeology" && (
            <>
              <div className={styles.section}>
                <h3>🏛️ דמו חקר ארכיאולוגי חכם</h3>
                <p>
                  לתהליך המלא, בקר ב
                  <a
                    href="/fll_group/archaeology"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    דף הדמו
                  </a>
                </p>
              </div>

              <div className={styles.section}>
                <ModelUpload />
              </div>

              <div className={styles.section}>
                <h3>📚 הוראות טעינת המודל</h3>
                <div className={styles.instructionBox}>
                  <h4>כיצד להכין מודל Teachable Machine:</h4>
                  <ol className={styles.instructionList}>
                    <li>
                      כנס ל-
                      <a
                        href="https://teachablemachine.withgoogle.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Teachable Machine
                      </a>
                    </li>
                    <li>בחר "Image Project" והתחל מיזם חדש</li>
                    <li>
                      בנה תקופות ארכיאולוגיות שונות כ-Classes (לדוגמה: תקופה
                      ברונזה, תקופה ברזל, תקופה רומאית וכו')
                    </li>
                    <li>אמן את המודל על תמונות ממצאים ארכיאולוגיים</li>
                    <li>
                      כאשר סיימת, יצא את המודל בתבנית TensorFlow.js ("Export" →
                      "Tensorflow.js")
                    </li>
                    <li>הורד את הקבצים (model.json + קבצי משקולות)</li>
                    <li>צור תיקייה בשם "tm_model" תחת /public</li>
                    <li>העלה את כל הקבצים ל-/public/tm_model/ בפרויקט שלך</li>
                  </ol>
                </div>

                <div className={styles.instructionBox}>
                  <h4>❓ שאלות נפוצות:</h4>
                  <div className={styles.faqItem}>
                    <strong>מהי Teachable Machine?</strong>
                    <p>
                      זו פלטפורמה בחינם של Google המאפשרת לך לאמן מודלי למידת
                      מכונה ללא ידע בקידוד.
                    </p>
                  </div>
                  <div className={styles.faqItem}>
                    <strong>איכמ ניתן לשפר את הדיוק?</strong>
                    <p>
                      הסף את המודל עם יותר תמונות לכל תקופה. ודא שתמונות מייצגות
                      זוויות וגוונים שונים של הממצאים.
                    </p>
                  </div>
                  <div className={styles.faqItem}>
                    <strong>האם זה עובד ללא אינטרנט?</strong>
                    <p>
                      לא, המודל צריך להעלות לאחסון אך ההסקה בדפדפן מתרחשת מקומית
                      לאחר טעינה ראשונית.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>🔗 מידע נוסף</h3>
                <ul className={styles.linkList}>
                  <li>
                    <a
                      href="https://teachablemachine.withgoogle.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Teachable Machine
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tensorflow.org/js"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TensorFlow.js תיעוד
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mapping.gov.il/Default.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GovMap - מאגר נתונים ארצי
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Save All Button at Bottom */}
        <div className={styles.bottomBar}>
          <button className={styles.saveAllButton} onClick={handleSaveAll}>
            💾 שמור את כל השינויים
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
