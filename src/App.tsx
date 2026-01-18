import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import { ContentProvider } from "./context/ContentContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <ContentProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company" element={<CompanyPage />} />
      </Routes>
    </ContentProvider>
  );
}

export default App;
