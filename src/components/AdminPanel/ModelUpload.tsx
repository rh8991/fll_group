import { useState, useCallback } from "react";
import { useContent } from "@/context/ContentContext";
import styles from "./ImageUpload.module.css";

interface ModelUploadProps {
  onSaveSuccess?: () => void;
}

const ModelUpload: React.FC<ModelUploadProps> = ({ onSaveSuccess }) => {
  const { teachableMachineCode, updateContent } = useContent();
  const [code, setCode] = useState(teachableMachineCode || "");
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const extractModelUrl = (scriptContent: string): string | null => {
    // Try to extract URL from various possible formats
    const urlMatch = scriptContent.match(/const\s+URL\s*=\s*["']([^"']+)["']/);
    if (urlMatch) {
      return urlMatch[1];
    }

    // Alternative pattern
    const urlMatch2 = scriptContent.match(
      /https:\/\/teachablemachine\.withgoogle\.com\/models\/[^"';\s]+/,
    );
    if (urlMatch2) {
      return urlMatch2[0];
    }

    return null;
  };

  const validateCode = useCallback((scriptCode: string): boolean => {
    // Check if it contains key Teachable Machine elements
    const hasInit =
      scriptCode.includes("async function init()") ||
      scriptCode.includes("function init()");
    const hasPredict =
      scriptCode.includes("async function predict()") ||
      scriptCode.includes("function predict()");
    const hasTmImage = scriptCode.includes("tmImage");
    const hasUrl =
      scriptCode.includes("teachablemachine.withgoogle.com") ||
      scriptCode.includes("const URL");

    return hasInit && hasPredict && hasTmImage && hasUrl;
  }, []);

  const handleSaveCode = () => {
    if (!code.trim()) {
      setMessage({
        type: "error",
        text: "אנא הדבק את קוד ה-Teachable Machine",
      });
      return;
    }

    if (!validateCode(code)) {
      setMessage({
        type: "error",
        text: "קוד לא תקין. ודא שהוא מכיל init(), predict(), tmImage, וכתובת מודל",
      });
      return;
    }

    const modelUrl = extractModelUrl(code);
    if (!modelUrl) {
      setMessage({
        type: "error",
        text: "לא ניתן לחלץ את כתובת ה-URL של המודל מהקוד",
      });
      return;
    }

    // Save code to context
    updateContent("teachableMachineCode", code);

    setMessage({
      type: "success",
      text: `המודל נטען בהצלחה! URL: ${modelUrl}`,
    });

    if (onSaveSuccess) {
      onSaveSuccess();
    }
  };

  const handleClear = () => {
    if (
      window.confirm(
        "האם אתה בטוח שברצונך לנקות את קוד ה-Teachable Machine השמור?",
      )
    ) {
      setCode("");
      updateContent("teachableMachineCode", "");
      setMessage({
        type: "info",
        text: "הקוד נוקה",
      });
    }
  };

  return (
    <div className={styles.uploadSection}>
      <h4>� קוד Teachable Machine</h4>
      <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
        הדבק את קוד הה-export מ-Google Teachable Machine (החלק שמכיל את
        הפונקציות init() ו-predict())
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "bold",
            fontSize: "0.95rem",
          }}
        >
          📋 הדבק את קוד ה-Teachable Machine:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="הדבק את קוד ה-HTML/JavaScript מ-Teachable Machine כאן..."
          style={{
            width: "100%",
            height: "300px",
            padding: "1rem",
            fontSize: "0.85rem",
            fontFamily: "monospace",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxSizing: "border-box",
            direction: "ltr",
            textAlign: "left",
          }}
        />
      </div>

      <div
        style={{
          marginBottom: "1rem",
          padding: "1rem",
          backgroundColor: "#f0f8f7",
          border: "1px solid #c8e0dd",
          borderRadius: "8px",
          fontSize: "0.85rem",
          color: "#555",
        }}
      >
        <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
          ℹ️ כיצד להשיג את הקוד:
        </p>
        <ol style={{ margin: 0, paddingRight: "1.5rem" }}>
          <li>פתח את המודל שלך ב-Google Teachable Machine</li>
          <li>לחץ על "Export Model"</li>
          <li>בחר "Tensorflow.js" טאב</li>
          <li>בחר "Upload my Model"</li>
          <li>העתק את קוד ה-HTML שמופיע</li>
          <li>הדבק את הקוד כאן</li>
        </ol>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={handleSaveCode}
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: "#8ea19e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "all 0.3s",
          }}
        >
          💾 שמור קוד
        </button>
        <button
          onClick={handleClear}
          disabled={!code.trim()}
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: !code.trim() ? "#ccc" : "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: !code.trim() ? "not-allowed" : "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "all 0.3s",
            opacity: !code.trim() ? 0.6 : 1,
          }}
        >
          🗑️ נקה קוד
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor:
              message.type === "success"
                ? "#d4edda"
                : message.type === "error"
                  ? "#f8d7da"
                  : "#d1ecf1",
            color:
              message.type === "success"
                ? "#155724"
                : message.type === "error"
                  ? "#721c24"
                  : "#0c5460",
            border: `1px solid ${
              message.type === "success"
                ? "#c3e6cb"
                : message.type === "error"
                  ? "#f5c6cb"
                  : "#bee5eb"
            }`,
            fontSize: "0.9rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message.text}
        </div>
      )}

      {teachableMachineCode && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#e8f5e9",
            border: "1px solid #81c784",
            borderRadius: "8px",
            fontSize: "0.85rem",
            color: "#2e7d32",
          }}
        >
          <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>
            ✅ קוד מודל שמור!
          </p>
          <p style={{ margin: 0 }}>המודל מוכן לשימוש בדף ההצגה.</p>
        </div>
      )}
    </div>
  );
};

export default ModelUpload;
