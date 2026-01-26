import { useState, useRef, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./SmartArchaeology.module.css";

// Constant for govmap iframe URL
const GOVMAP_URL = "https://apq9h.app.goo.gl/wBD8";

interface Prediction {
  class: string;
  probability: number;
}

const SmartArchaeologyPage: React.FC = () => {
  const { themeColors, teachableMachineCode } = useContent();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelLoaded, setModelLoaded] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Initialize and load the Teachable Machine model from code snippet
  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        setError("");

        // Check if code snippet is available
        if (!teachableMachineCode || !teachableMachineCode.trim()) {
          setError(
            "📌 שימו לב: טרם נוסף קוד מודל. בדקו שנוספה דרך דף הניהול (Admin Panel) בלשונית 'ארכיאולוגיה'",
          );
          setModelLoaded(false);
          setLoading(false);
          return;
        }

        // Load the tmImage library from Google
        const script1 = document.createElement("script");
        script1.src =
          "https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.js";
        script1.async = true;

        await new Promise<void>((resolve, reject) => {
          script1.onload = () => resolve();
          script1.onerror = () =>
            reject(new Error("Failed to load tmImage library"));
          document.body.appendChild(script1);
        });

        // Extract the model URL from the code snippet
        const urlMatch = teachableMachineCode.match(
          /const\s+URL\s*=\s*["']([^"']+)["']/,
        );
        if (!urlMatch || !urlMatch[1]) {
          throw new Error("Could not extract model URL from code snippet");
        }

        // Execute the Teachable Machine code in a function scope
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const codeWithOverrides = `
          (async () => {
            ${teachableMachineCode}
            
            // Make init and predict available to the page
            window.tmInit = typeof init !== 'undefined' ? init : null;
            window.tmPredict = typeof predict !== 'undefined' ? predict : null;
            window.tmURL = URL;
            window.tmImage = typeof tmImage !== 'undefined' ? tmImage : null;
          })();
        `;

        const functionBody = new Function(codeWithOverrides);
        await functionBody();

        // Verify the functions are available
        const tmGlobal = window as any;
        if (!tmGlobal.tmInit || !tmGlobal.tmPredict) {
          throw new Error(
            "Code snippet does not contain init() and predict() functions",
          );
        }

        setModelLoaded(true);
        setError("");
      } catch (err: any) {
        setError(`שגיאה בטעינת המודל: ${err.message}`);
        setModelLoaded(false);
      } finally {
        setLoading(false);
      }
    };

    if (teachableMachineCode) {
      loadModel();
    }
  }, [teachableMachineCode]);

  // Handle camera toggle
  const handleCameraToggle = async () => {
    if (cameraActive) {
      // Stop camera
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setCameraActive(false);
      setStream(null);
      setUploadedImage("");
      setPredictions([]);
      setError("");
    } else {
      // Start camera
      try {
        setError("");
        // Validate secure context (required except localhost)
        const isSecure =
          window.location.protocol === "https:" ||
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";
        if (!isSecure) {
          throw new Error(
            "הדפדפן דורש חיבור מאובטח (HTTPS) או localhost להפעלת מצלמה",
          );
        }

        const tryConstraints = async (constraints: MediaStreamConstraints) => {
          return navigator.mediaDevices.getUserMedia(constraints);
        };

        let mediaStream: MediaStream | null = null;
        try {
          // Prefer back camera when available
          mediaStream = await tryConstraints({
            video: { facingMode: { ideal: "environment" } },
            audio: false,
          });
        } catch (e) {
          // Fallback to front camera
          mediaStream = await tryConstraints({
            video: { facingMode: { ideal: "user" } },
            audio: false,
          });
        }

        setStream(mediaStream);
        setCameraActive(true);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          // Some browsers (Safari/iOS) need an explicit play()
          try {
            await videoRef.current.play();
          } catch {}
        }
      } catch (err: any) {
        setError(`שגיאה בהפעלת מצלמה: ${err.message}`);
        setCameraActive(false);
      }
    }
  };

  // Capture photo from camera
  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL("image/jpeg");

      setUploadedImage(imageData);
      setPredictions([]);
      setError("");
    }
  };

  // Run inference on the uploaded image
  const handleAnalyze = async () => {
    if (!uploadedImage) {
      setError("אנא צלם תמונה");
      return;
    }

    if (!modelLoaded && !demoMode) {
      setError("אנא הוסף קוד Teachable Machine או השתמש ב-Demo Mode");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Demo mode - show sample results
      if (demoMode) {
        // Simulate analysis delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const samplePredictions: Prediction[] = [
          { class: "תקופה ברונזית", probability: 85.42 },
          { class: "תקופה רומית", probability: 12.38 },
          { class: "תקופה מוסלמית מוקדמת", probability: 2.2 },
        ];

        setPredictions(samplePredictions);
        setLoading(false);
        return;
      }

      // Create an image element to load the captured image
      const img = new Image();
      img.src = uploadedImage;

      img.onload = async () => {
        try {
          const tmGlobal = window as any;

          // Check if predict function is available
          if (!tmGlobal.tmPredict) {
            throw new Error("Model predict function not available");
          }

          // Create a canvas element with the image
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            throw new Error("Unable to get canvas context");
          }

          ctx.drawImage(img, 0, 0);

          // Call the Teachable Machine predict function
          const prediction = await tmGlobal.tmPredict(canvas);

          // Convert predictions to our format
          const predictionResults: Prediction[] = [];

          if (Array.isArray(prediction)) {
            // If prediction is an array of objects with class and probability
            predictionResults.push(
              ...prediction.map((p: any) => ({
                class: p.class || p.className || "Unknown",
                probability: (p.probability || p.prob || 0) * 100,
              })),
            );
          } else if (typeof prediction === "object") {
            // If prediction is an object with class names as keys
            Object.entries(prediction).forEach(
              ([className, prob]: [string, any]) => {
                predictionResults.push({
                  class: className,
                  probability: (prob as number) * 100,
                });
              },
            );
          }

          // Sort by probability descending
          predictionResults.sort((a, b) => b.probability - a.probability);

          setPredictions(predictionResults);
        } catch (err: any) {
          setError(`שגיאה בניתוח התמונה: ${err.message}`);
          setPredictions([]);
        } finally {
          setLoading(false);
        }
      };

      img.onerror = () => {
        setError("שגיאה בטעינת התמונה");
        setLoading(false);
      };
    } catch (err: any) {
      setError(`שגיאה בניתוח: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.pageContainer}
      style={
        {
          "--primary": themeColors?.primary,
          "--secondary": themeColors?.secondary,
          "--accent": themeColors?.accent,
          "--dark": themeColors?.dark,
          "--light": themeColors?.light,
          "--text": themeColors?.text,
        } as React.CSSProperties
      }
    >
      <Header theme="demo" />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              חקר ארכיאולוגי חכם בעזרת בינה מלאכותית
            </h1>
            <p className={styles.description}>
              מערכת זו מדגימה כיצד ניתן להשתמש בבינה מלאכותית כדי לנתח תמונות של
              ממצאים ארכיאולוגיים ולהעריך את התקופה ההיסטורית אליה הם שייכים, על
              בסיס מאפיינים חזותיים בלבד.
            </p>
          </div>
        </section>

        {/* Upload and Analysis Section */}
        <section className={styles.uploadSection}>
          <div className={styles.uploadContainer}>
            <h2 className={styles.sectionTitle}>צילום וניתוח ממצא</h2>

            <div className={styles.mainContent}>
              {/* Camera and GovMap Side by Side */}
              <div className={styles.contentWrapper}>
                {/* Camera Panel */}
                <div className={styles.cameraPanel}>
                  <p className={styles.uploadIntro}>
                    צלם תמונה של ממצא ארכיאולוגי בעזרת מצלמתך
                  </p>

                  <div className={styles.cameraContainer}>
                    {!cameraActive ? (
                      <>
                        {!uploadedImage ? (
                          <div className={styles.uploadBox}>
                            <div className={styles.uploadIconArea}>
                              <span className={styles.uploadIcon}>📷</span>
                            </div>
                            <p className={styles.uploadText}>
                              לחץ להפעלת מצלמה
                            </p>
                            <button
                              className={styles.uploadButton}
                              onClick={handleCameraToggle}
                            >
                              📹 הפעל מצלמה
                            </button>
                          </div>
                        ) : (
                          <div className={styles.uploadSuccessBox}>
                            <div className={styles.successIcon}>✓</div>
                            <p className={styles.successText}>
                              תמונה צולמה בהצלחה!
                            </p>
                            <div
                              style={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "center",
                                marginTop: "1.5rem",
                              }}
                            >
                              <button
                                className={styles.changeImageButton}
                                onClick={handleCameraToggle}
                              >
                                📹 צלם מחדש
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className={styles.videoContainer}>
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          playsInline
                          className={styles.videoElement}
                        />
                        <canvas ref={canvasRef} style={{ display: "none" }} />
                        <div className={styles.cameraControls}>
                          <button
                            className={styles.captureButton}
                            onClick={handleCapturePhoto}
                          >
                            📸 צלם תמונה
                          </button>
                          <button
                            className={styles.closeCameraButton}
                            onClick={handleCameraToggle}
                          >
                            ✕ סגור
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Uploaded Image Preview */}
                  {uploadedImage && !cameraActive && (
                    <div className={styles.previewSection}>
                      <h3 className={styles.previewTitle}>תצוגה מקדימה</h3>
                      <div className={styles.imagePreview}>
                        <img src={uploadedImage} alt="Captured artifact" />
                      </div>
                    </div>
                  )}

                  {/* Analyze Button */}
                  {uploadedImage && (
                    <button
                      className={styles.analyzeButton}
                      onClick={handleAnalyze}
                      disabled={
                        !uploadedImage || (!modelLoaded && !demoMode) || loading
                      }
                    >
                      {loading ? "מעבד..." : "נתח ממצא"}
                    </button>
                  )}

                  {/* Demo Mode Toggle */}
                  {!modelLoaded && !error?.includes("שימו לב") && (
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "1rem",
                        backgroundColor: "#fff3cd",
                        borderRadius: "8px",
                        border: "1px solid #ffc107",
                        textAlign: "center",
                      }}
                    >
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={demoMode}
                          onChange={(e) => setDemoMode(e.target.checked)}
                          style={{
                            cursor: "pointer",
                            width: "18px",
                            height: "18px",
                          }}
                        />
                        🎮 מצב הדגמה - הצג תוצאות לדוגמה
                      </label>
                    </div>
                  )}

                  {/* Model Status */}
                  <div className={styles.statusMessage}>
                    {modelLoaded ? (
                      <p style={{ color: "green", fontWeight: "bold" }}>
                        ✓ המודל טעון ויצור לשימוש
                      </p>
                    ) : demoMode ? (
                      <p style={{ color: "#ffc107", fontWeight: "bold" }}>
                        🎮 כרגע במצב הדגמה - תוצאות לדוגמה בלבד
                      </p>
                    ) : error && error.includes("שימו לב") ? (
                      <p style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                        {error}
                      </p>
                    ) : (
                      <p style={{ color: "orange", fontWeight: "bold" }}>
                        ⏳ טוען מודל... אנא קודם הוסיפו את קוד Teachable Machine
                        בדף הניהול
                      </p>
                    )}
                  </div>

                  {/* Error Messages */}
                  {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                {/* GovMap Panel */}
                <div className={styles.govmapPanel}>
                  <h3 className={styles.govmapTitle}>
                    מאגר ממצאים ארכיאולוגיים
                  </h3>
                  <p className={styles.govmapNote}>לחץ על המפה כדי לגלול.</p>

                  <div className={styles.mapWrapper}>
                    <iframe
                      src={GOVMAP_URL}
                      className={styles.govmapIframe}
                      title="GovMap - National Data Repository"
                      style={{}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {predictions.length > 0 && (
          <section className={styles.resultsSection}>
            <h2 className={styles.sectionTitle}>תוצאות ניתוח</h2>

            <div className={styles.resultsContainer}>
              <div className={styles.mainPrediction}>
                <p className={styles.resultLabel}>תקופה היסטורית משוערת</p>
                <h3 className={styles.mainClass}>{predictions[0].class}</h3>
                <p className={styles.mainConfidence}>
                  ביטחון: {predictions[0].probability.toFixed(2)}%
                </p>
              </div>

              <div className={styles.allPredictions}>
                <h3>פירוט כל התקופות</h3>
                <div className={styles.predictionsList}>
                  {predictions.map((pred, index) => (
                    <div key={index} className={styles.predictionItem}>
                      <div className={styles.predictionLabel}>{pred.class}</div>
                      <div className={styles.confidenceBar}>
                        <div
                          className={styles.confidenceFill}
                          style={{
                            width: `${pred.probability}%`,
                            backgroundColor: themeColors?.accent,
                          }}
                        />
                      </div>
                      <div className={styles.predictionPercent}>
                        {pred.probability.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className={styles.disclaimer}>
              <strong>הערה חשובה:</strong>
              <p>
                זוהי הדגמה חינוכית בלבד. המערכת אינה מחליפה שיטות תיארוך מדעיות
                כמו תיארוך פחמן-14, אלא מסייעת בהערכה ראשונית המבוססת על מראה
                הממצא.
              </p>
            </div>
          </section>
        )}

        {/* Teachable Machine Footer Note */}
        <section className={styles.footerNote}>
          <p>
            🤖 מערכת זו בנויה בעזרת{" "}
            <a
              href="https://teachablemachine.withgoogle.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Teachable Machine
            </a>{" "}
            וטנסור-פלו עבור סיווג תמונות בזמן אמת.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SmartArchaeologyPage;
