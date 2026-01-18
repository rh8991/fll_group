import { useState } from "react";
import styles from "./Gallery.module.css";

const slides = [
  { icon: "🏆", title: "צוות במלוא הכוחות", image: "/images/team1.jpg" },
  { icon: "🤖", title: "עבודה על הרובוט", image: "/images/robot1.jpg" },
  { icon: "💻", title: "פיתוח התוכנה", image: "/images/coding1.jpg" },
  { icon: "🎯", title: "אימוני זירה", image: "/images/practice1.jpg" },
  { icon: "🌟", title: "יום התחרות", image: "/images/competition1.jpg" },
];

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
                {slide.image ? (
                  <div className={styles.imageContainer}>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay}>
                      <span className={styles.slideTitle}>{slide.title}</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.icon}>{slide.icon}</span>
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
            ❮
          </button>
          <button
            className={`${styles.nav} ${styles.next}`}
            onClick={nextSlide}
            aria-label="Next"
          >
            ❯
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
