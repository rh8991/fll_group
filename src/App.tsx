import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import SmartArchaeologyPage from "./pages/SmartArchaeologyPage";
import { ContentProvider, useContent } from "./context/ContentContext";
import ScrollToTop from "./components/ScrollToTop";

function AppContent() {
  const { themeColors } = useContent();

  useEffect(() => {
    // Apply theme colors dynamically
    const root = document.documentElement;
    root.style.setProperty("--primary", themeColors.primary);
    root.style.setProperty("--secondary", themeColors.secondary);
    root.style.setProperty("--accent", themeColors.accent);
    root.style.setProperty("--dark", themeColors.dark);
    root.style.setProperty("--light", themeColors.light);
    root.style.setProperty("--text", themeColors.text);
  }, [themeColors]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/archaeology" element={<SmartArchaeologyPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;
