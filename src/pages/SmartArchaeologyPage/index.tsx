import { useState, useRef, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./SmartArchaeology.module.css";

// Constant for govmap iframe URL
const GOVMAP_URL = "https://apq9h.app.goo.gl/wBD8";

interface Prediction {
  className: string;
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
  const [classNames, setClassNames] = useState<string[]>([]);

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

        // Timeout wrapper for async operations
        const withTimeout = <T,>(
          promise: Promise<T>,
          ms: number,
          errorMsg: string,
        ): Promise<T> => {
          return Promise.race([
            promise,
            new Promise<T>((_, reject) =>
              setTimeout(() => reject(new Error(errorMsg)), ms),
            ),
          ]);
        };

        // Load TensorFlow.js first
        const tfScript = document.createElement("script");
        tfScript.src =
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js";
        tfScript.async = true;

        await withTimeout(
          new Promise<void>((resolve, reject) => {
            tfScript.onload = () => resolve();
            tfScript.onerror = () =>
              reject(new Error("Failed to load TensorFlow.js"));
            document.body.appendChild(tfScript);
          }),
          10000,
          "פסק זמן טעינת TensorFlow.js",
        );

        // Load the tmImage library from Google
        const tmScript = document.createElement("script");
        tmScript.src =
          "https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js";
        tmScript.async = true;

        await withTimeout(
          new Promise<void>((resolve, reject) => {
            tmScript.onload = () => resolve();
            tmScript.onerror = () =>
              reject(new Error("Failed to load tmImage library"));
            document.body.appendChild(tmScript);
          }),
          10000,
          "פסק זמן טעינת ספריית Teachable Machine",
        );

        // Extract the model URL from the code snippet
        const urlMatch = teachableMachineCode.match(
          /const\s+URL\s*=\s*["']([^"']+)["']/,
        );
        if (!urlMatch || !urlMatch[1]) {
          throw new Error("Could not extract model URL from code snippet");
        }

        const modelURL = urlMatch[1];
        console.log("🔗 Model URL:", modelURL);

        // Load model directly using tmImage (not the init function which sets up webcam)
        const tmImage = (window as any).tmImage;
        if (!tmImage) {
          throw new Error("tmImage library not loaded");
        }

        console.log("🚀 Loading model from Teachable Machine...");
        const model = (await withTimeout(
          tmImage.load(modelURL + "model.json", modelURL + "metadata.json"),
          30000,
          "פסק זמן בטעינת המודל - המודל יכול להיות גדול מדי או שהחיבור איטי",
        )) as any;

        // Store model globally for predict function
        (window as any).tmModel = model;
        (window as any).tmImage = tmImage;

        // Extract class names from the model
        const totalClasses = model.getTotalClasses();
        const extractedClassNames: string[] = [];
        for (let i = 0; i < totalClasses; i++) {
          extractedClassNames.push(model.getClassLabels()[i] || `Class ${i}`);
        }
        setClassNames(extractedClassNames);

        console.log("✅ Model loaded successfully!");
        console.log("📊 Total classes:", totalClasses);
        console.log("📝 Class names:", extractedClassNames);

        setModelLoaded(true);
        setError("");
      } catch (err: any) {
        console.error("❌ Model loading error:", err);
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

  // Attach stream to video element when available
  useEffect(() => {
    if (stream && videoRef.current && cameraActive) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => {
        console.error("Video play error:", err);
        setError(`שגיאה בהפעלת וידאו: ${err.message}`);
      });
    }
  }, [stream, cameraActive]);

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
            video: {
              facingMode: { ideal: "environment" },
              width: { ideal: 1280 },
            },
            audio: false,
          });
        } catch (e) {
          console.warn("Back camera failed, trying front:", e);
          try {
            // Fallback to front camera
            mediaStream = await tryConstraints({
              video: { facingMode: { ideal: "user" }, width: { ideal: 1280 } },
              audio: false,
            });
          } catch (e2) {
            console.warn("Front camera failed, trying default:", e2);
            // Final fallback: any video
            mediaStream = await tryConstraints({
              video: true,
              audio: false,
            });
          }
        }

        if (!mediaStream) {
          throw new Error("לא ניתן לגשת למצלמה");
        }

        setStream(mediaStream);
        setCameraActive(true);
      } catch (err: any) {
        let errorMessage = `שגיאה בהפעלת מצלמה: ${err.message}`;
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          errorMessage =
            "❌ הגישה למצלמה נדחתה. אנא אפשר גישה למצלמה בהגדרות הדפדפן";
        } else if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
          errorMessage = "❌ לא נמצאה מצלמה במכשיר זה";
        } else if (
          err.name === "NotReadableError" ||
          err.name === "TrackStartError"
        ) {
          errorMessage = "❌ המצלמה בשימוש על ידי אפליקציה אחרת";
        }
        setError(errorMessage);
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
      // Freeze camera (stop stream)
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setCameraActive(false);
        setStream(null);
      }
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

      // Demo mode - show sample results with actual class names
      if (demoMode) {
        // Simulate analysis delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate demo predictions using actual class names
        let samplePredictions: Prediction[] = [];

        if (classNames.length > 0) {
          // Create demo predictions with real class names
          const probabilities = classNames.map((_, index) => {
            // First class gets highest probability, others get decreasing probabilities
            return Math.max(
              10,
              Math.round((100 / classNames.length) * (1 - index * 0.3)),
            );
          });

          // Adjust to sum to 100
          const total = probabilities.reduce((a, b) => a + b, 0);
          const normalized = probabilities.map((p) => (p / total) * 100);

          samplePredictions = classNames.map((name, index) => ({
            className: name,
            probability: normalized[index],
          }));

          // Sort by probability descending
          samplePredictions.sort((a, b) => b.probability - a.probability);
        } else {
          // Fallback if no class names extracted
          samplePredictions = [
            { className: "Class 1", probability: 85.42 },
            { className: "Class 2", probability: 12.38 },
            { className: "Class 3", probability: 2.2 },
          ];
        }

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

          // Check if model is available
          if (!tmGlobal.tmModel) {
            throw new Error("Model not loaded");
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

          // Call the Teachable Machine predict function directly on the model
          console.log("🔮 Running prediction...");
          const prediction = await tmGlobal.tmModel.predict(canvas);
          console.log("📊 Raw prediction:", prediction);

          // Convert predictions to our format
          const predictionResults: Prediction[] = prediction.map((p: any) => ({
            className: p.className,
            probability: p.probability * 100,
          }));

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
                    {cameraActive ? (
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
                            📸 צלם
                          </button>
                          <button
                            className={styles.closeCameraButton}
                            onClick={handleCameraToggle}
                          >
                            ✕ סגור
                          </button>
                        </div>
                      </div>
                    ) : (
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
                              <button
                                className={styles.analyzeButton}
                                onClick={handleAnalyze}
                                disabled={
                                  (!modelLoaded && !demoMode) || loading
                                }
                              >
                                {loading ? "מעבד..." : "נתח תמונה"}
                              </button>
                            </div>
                          </div>
                        )}
                      </>
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
                <h3 className={styles.mainClass}>{predictions[0].className}</h3>
                <p className={styles.mainConfidence}>
                  ביטחון: {predictions[0].probability.toFixed(2)}%
                </p>
              </div>

              <div className={styles.allPredictions}>
                <h3>פירוט כל התקופות</h3>
                <div className={styles.predictionsList}>
                  {predictions.map((pred, index) => (
                    <div key={index} className={styles.predictionItem}>
                      <div className={styles.predictionLabel}>
                        {pred.className}
                      </div>
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
