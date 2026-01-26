import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface TeamMember {
  name: string;
  role: string;
}

interface ThemeColors {
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
}

interface GalleryImage {
  url: string;
  title: string;
}

interface ContentState {
  aboutText: string;
  problemText: string;
  solutionText: string;
  implementationText: string;
  companyLink: string;
  teamMembers: TeamMember[];
  themeColors: ThemeColors;
  headerTitle: string;
  headerCompanyTitle: string;
  footerLocation: string;
  footerSeason: string;
  footerCopyright: string;
  galleryImages: GalleryImage[];
  // Company Page Content
  companyHeroTitle: string;
  companyHeroTagline: string;
  companyHeroSubtitle: string;
  companyAboutText: string;
  companyFeatures: Array<{ icon: string; title: string; description: string }>;
  companyContactEmail: string;
  companyContactPhone: string;
  companyContactWebsite: string;
  companyContactText: string;
  // Archaeology Demo
  teachableMachineCode: string;
}

interface ContentContextType extends ContentState {
  updateContent: (
    key: keyof ContentState,
    value: string | TeamMember[] | ThemeColors | GalleryImage[],
  ) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({
  children,
}) => {
  const [content, setContent] = useState<ContentState>({
    aboutText: "",
    problemText: "",
    solutionText: "",
    implementationText: "",
    companyLink: "",
    teamMembers: Array(10).fill({ name: "", role: "" }),
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
    headerTitle: "The Shimis",
    headerCompanyTitle: "ArcheoVision AI",
    footerLocation: "📍 הטכנודע, חדרה",
    footerSeason: "🏛️ FIRST LEGO League - עונת UNEARTHED 2026",
    footerCopyright:
      "© 2024-2025 The Shimis | כל הזכויות שמורות\nכבוד הדדי • שיתוף פעולה • חדשנות • התמדה",
    galleryImages: [],
    // Company Page Content
    companyHeroTitle: "ArcheoVision AI",
    companyHeroTagline: "בינה מלאכותית לארכיאולוגיה נגישה",
    companyHeroSubtitle:
      "המערכת הראשונה בישראל לזיהוי ארכיאולוגי אוטומטי באמצעות טלפונים ורחפנים זולים",
    companyAboutText:
      "<strong>ArcheoVision AI</strong> היא חברת טכנולוגיה חדשנית שמטרתה לעשות את עולם הארכיאולוגיה נגיש לכולם.\n\nאנחנו מאמינים שכל אחד צריך להיות מסוגל לתרום לגילוי וחקר העבר שלנו, לא רק מומחים עם ציוד יקר.\n\nבאמצעות מערכת הבינה המלאכותית המתקדמת שלנו, אנחנו מאפשרים לכל אדם עם טלפון חכם או רחפן זול לבצע ניתוחים ארכיאולוגיים ברמה מקצועית.",
    companyFeatures: [
      {
        icon: "📱",
        title: "צילום מהטלפון",
        description:
          "הפוך כל סמארטפון לכלי ארכיאולוגי מתקדם עם יכולות זיהוי AI מובנות",
      },
      {
        icon: "🚁",
        title: "סריקות מהאוויר",
        description:
          "זיהוי אתרים ארכיאולוגיים באמצעות רחפנים צעירים ונגישים בעלות נמוכה",
      },
      {
        icon: "🏺",
        title: "זיהוי אוטומטי",
        description:
          "מערכת AI מתקדמת לזיהוי עתיקות, סיווג סוגים, ושיערוך תקופות היסטוריות",
      },
      {
        icon: "🗺️",
        title: "אינטגרציה עם GovMap",
        description:
          "חיבור ישיר למערכת המיפוי הארצית של רשות העתיקות לתיעוד ושיתוף",
      },
      {
        icon: "💻",
        title: "פלטפורמה רב-ערוצית",
        description: "גישה דרך אתר, אפליקציה למובייל, וממשק API למפתחים",
      },
      {
        icon: "⚡",
        title: "תוצאות מיידיות",
        description: "קבל ניתוח מפורט תוך שניות עם רמת דיוק גבוהה",
      },
    ],
    companyContactEmail: "info@archeovision.ai",
    companyContactPhone: "04-1234567",
    companyContactWebsite: "www.archeovision.ai",
    companyContactText:
      "מעוניינים לשתף פעולה? צרו איתנו קשר ונשמח להציג את המערכת שלנו!",
    teachableMachineCode: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load content from Firebase on mount with timeout
  useEffect(() => {
    const loadContent = async () => {
      // Set a 3-second timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn("Firebase loading timeout - using defaults");
        setIsLoading(false);
      }, 3000);

      try {
        const docRef = doc(db, "siteContent", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as ContentState;
          setContent(data);
        }
      } catch (error) {
        console.error("Error loading content from Firebase:", error);
        // Fallback to localStorage if Firebase fails
        loadFromLocalStorage();
      } finally {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    };

    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fallback function to load from localStorage
  const loadFromLocalStorage = () => {
    const loadedContent: Partial<ContentState> = {};

    const aboutText = localStorage.getItem("aboutText");
    const problemText = localStorage.getItem("problemText");
    const solutionText = localStorage.getItem("solutionText");
    const implementationText = localStorage.getItem("implementationText");
    const companyLink = localStorage.getItem("companyLink");

    if (aboutText) loadedContent.aboutText = aboutText;
    if (problemText) loadedContent.problemText = problemText;
    if (solutionText) loadedContent.solutionText = solutionText;
    if (implementationText)
      loadedContent.implementationText = implementationText;
    if (companyLink) loadedContent.companyLink = companyLink;

    const teamMembers: TeamMember[] = [];
    for (let i = 1; i <= 10; i++) {
      const member = localStorage.getItem(`member${i}`);
      if (member) {
        const [name, role] = member.split(":");
        teamMembers.push({ name: name || "", role: role || "" });
      } else {
        teamMembers.push({ name: "", role: "" });
      }
    }
    if (teamMembers.some((m) => m.name || m.role)) {
      loadedContent.teamMembers = teamMembers;
    }

    const savedColors = localStorage.getItem("themeColors");
    if (savedColors) {
      try {
        loadedContent.themeColors = JSON.parse(savedColors);
      } catch (e) {
        console.error("Failed to load theme colors:", e);
      }
    }

    if (Object.keys(loadedContent).length > 0) {
      setContent((prev) => ({ ...prev, ...loadedContent }));
    }
  };

  const updateContent = async (
    key: keyof ContentState,
    value: string | TeamMember[] | ThemeColors | GalleryImage[],
  ) => {
    // Update local state immediately for responsive UI
    setContent((prev) => ({ ...prev, [key]: value }));

    try {
      // Save to Firebase
      const docRef = doc(db, "siteContent", "main");
      const updatedContent = { ...content, [key]: value };
      await setDoc(docRef, updatedContent);

      // Also save to localStorage as backup
      if (key === "teamMembers" && Array.isArray(value)) {
        (value as TeamMember[]).forEach((member, index) => {
          localStorage.setItem(
            `member${index + 1}`,
            `${member.name}:${member.role}`,
          );
        });
      } else if (key === "galleryImages" && Array.isArray(value)) {
        localStorage.setItem("galleryImages", JSON.stringify(value));
      } else if (
        key === "themeColors" &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        localStorage.setItem("themeColors", JSON.stringify(value));
      } else if (typeof value === "string") {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("⚠️ שגיאה בשמירת השינויים. אנא בדוק את חיבור האינטרנט.");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>טוען...</p>
      </div>
    );
  }

  return (
    <ContentContext.Provider value={{ ...content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};
