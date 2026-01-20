import { useState } from "react";
import { useContent } from "@/context/ContentContext";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const { galleryImages } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default placeholder slides if no images uploaded
  const defaultSlides = [
    { icon: "🏆", title: "צוות במלוא הכוחות" },
    { icon: "🤖", title: "עבודה על הרובוט" },
    { icon: "💻", title: "פיתוח התוכנה" },
    { icon: "🎯", title: "אימוני זירה" },
    { icon: "🌟", title: "יום התחרות" },
  ];

  // Use uploaded images if available, otherwise use placeholders
  const slides =
    galleryImages && galleryImages.length > 0
      ? galleryImages.map((img) => ({ url: img.url, title: img.title }))
      : defaultSlides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.section} id="gallery">
      <div className={styles.container}>
        <h2 className={styles.title}>גלריית תמונות</h2>
        <div className={styles.carousel}>
          <div className={styles.slideContainer}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === currentSlide ? styles.active : ""
                }`}
              >
                {"url" in slide ? (
                  <div className={styles.imageContainer}>
                    <img
                      src={slide.url}
                      alt={slide.title}
                      className={styles.image}
                      onError={(e) => {
                        console.error("Image failed to load:", slide.url);
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={() => console.log("Image loaded:", slide.url)}
                    />
                    <div className={styles.imageOverlay}>
                      <span className={styles.slideTitle}>{slide.title}</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.icon}>
                      {"icon" in slide ? slide.icon : "📷"}
                    </span>
                    <span className={styles.slideTitle}>{slide.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className={`${styles.nav} ${styles.prev}`}
            onClick={prevSlide}
            aria-label="Previous"
          >
            ❯
          </button>
          <button
            className={`${styles.nav} ${styles.next}`}
            onClick={nextSlide}
            aria-label="Next"
          >
            ❮
          </button>

          <div className={styles.dots}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
