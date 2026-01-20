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
}

interface ContentContextType extends ContentState {
  updateContent: (
    key: keyof ContentState,
    value: string | TeamMember[] | ThemeColors,
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
    },
    headerTitle: "Technoda Warriors",
    headerCompanyTitle: "ArcheoVision AI",
    footerLocation: "📍 הטכנודע, חדרה",
    footerSeason: "🏛️ FIRST LEGO League - עונת UNEARTHED 2025",
    footerCopyright:
      "© 2024-2025 Technoda Warriors FLL | כל הזכויות שמורות\nכבוד הדדי • שיתוף פעולה • חדשנות • התמדה",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load content from Firebase on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log("Starting to load Firebase...");
        const docRef = doc(db, "siteContent", "main");
        console.log("Firebase docRef created");
        const docSnap = await getDoc(docRef);
        console.log("Firebase getDoc completed", docSnap.exists());

        if (docSnap.exists()) {
          const data = docSnap.data() as ContentState;
          console.log("Loaded data from Firebase:", data);
          setContent(data);
        } else {
          console.log("No data in Firebase, creating default...");
          // If no data exists yet, save the default content with current state
          const defaultContent = {
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
            },
            headerTitle: "Technoda Warriors",
            headerCompanyTitle: "ArcheoVision AI",
            footerLocation: "📍 הטכנודע, חדרה",
            footerSeason: "🏛️ FIRST LEGO League - עונת UNEARTHED 2025",
            footerCopyright:
              "© 2024-2025 Technoda Warriors FLL | כל הזכויות שמורות\nכבוד הדדי • שיתוף פעולה • חדשנות • התמדה",
          };
          await setDoc(docRef, defaultContent);
          console.log("Default content saved to Firebase");
        }
      } catch (error) {
        console.error("Error loading content from Firebase:", error);
        console.log("Falling back to localStorage...");
        // Fallback to localStorage if Firebase fails
        loadFromLocalStorage();
      } finally {
        console.log("Setting isLoading to false");
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
    value: string | TeamMember[] | ThemeColors,
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
        value.forEach((member, index) => {
          localStorage.setItem(
            `member${index + 1}`,
            `${member.name}:${member.role}`,
          );
        });
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
