"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./HeroBanner.module.css";

const slides = [
  { id: 1, image: "/images/banners/banner-1.jpg", thumb: "/images/banners/banner-1.jpg" },
  { id: 2, image: "/images/banners/banner-2.jpg", thumb: "/images/banners/banner-2.jpg" },
  { id: 3, image: "/images/banners/banner-3.jpg", thumb: "/images/banners/banner-3.jpg" },
  { id: 4, image: "/images/banners/banner-4.jpg", thumb: "/images/banners/banner-4.jpg" },
];

const VISIBLE_THUMBS = 3;
const THUMB_LOOP_COPIES = 3;

export default function HeroBanner() {
  const t = useTranslations("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [isAnimating, setIsAnimating] = useState(false);
  const [thumbOffset, setThumbOffset] = useState(slides.length);
  const [thumbTransitionEnabled, setThumbTransitionEnabled] = useState(true);
  const [thumbStep, setThumbStep] = useState(58); // 48 + 10
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep thumbStep in sync with CSS thumb size + gap
  useEffect(() => {
    const updateThumbStep = () => {
      if (window.innerWidth <= 480) {
        setThumbStep(50); // 42px + 8px gap
      } else {
        setThumbStep(58); // 48px + 10px gap
      }
    };
    updateThumbStep();
    window.addEventListener("resize", updateThumbStep);
    return () => window.removeEventListener("resize", updateThumbStep);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setSlideDirection(index > activeIndex ? "left" : "right");
      setPrevIndex(activeIndex);
      setIsAnimating(true);
      setActiveIndex(index);
      setThumbTransitionEnabled(true);
      setThumbOffset((currentOffset) => {
        const currentMod = ((currentOffset % slides.length) + slides.length) % slides.length;
        const delta = (index - currentMod + slides.length) % slides.length;
        return currentOffset + delta;
      });
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        setPrevIndex(null);
      }, 600);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const nextIndex = (activeIndex + 1) % slides.length;

    setSlideDirection("left");
    setPrevIndex(activeIndex);
    setIsAnimating(true);
    setActiveIndex(nextIndex);
    setThumbTransitionEnabled(true);
    setThumbOffset((currentOffset) => currentOffset + 1);

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
    }, 600);
  }, [activeIndex]);

  useEffect(() => {
    const minOffset = slides.length;
    const maxOffset = slides.length * 2;

    if (thumbOffset >= maxOffset) {
      setThumbTransitionEnabled(false);
      setThumbOffset((currentOffset) => currentOffset - slides.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setThumbTransitionEnabled(true);
        });
      });
    } else if (thumbOffset < minOffset) {
      setThumbTransitionEnabled(false);
      setThumbOffset((currentOffset) => currentOffset + slides.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setThumbTransitionEnabled(true);
        });
      });
    }
  }, [thumbOffset]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) goNext();
    }, 6000);
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [goNext, isAnimating]);

  const thumbsLoop = Array.from({ length: THUMB_LOOP_COPIES }, () => slides).flat();

  return (
    <section className={styles.hero}>
      {/* Background images layer (desktop: absolute, mobile: below green) */}
      <div className={styles.slidesContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ""
              } ${index === prevIndex && isAnimating ? styles.slidePrev : ""
              } ${index === activeIndex && isAnimating
                ? slideDirection === "left"
                  ? styles.slideEnterFromRight
                  : styles.slideEnterFromLeft
                : ""
              }`}
          >
            <Image
              src={slide.image}
              alt={`Banner ${index + 1}`}
              fill
              className={styles.slideImage}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Green section: diagonal overlay on desktop, solid block on mobile */}
      <div className={styles.greenSection}>
        <div className={styles.content}>
          <h1 className={styles.title}>UZCHEM</h1>
          <p className={styles.subtitle}>
            {t("heroSubtitle")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
          </p>

          {/* Thumbnails + Arrow */}
          <div className={styles.controls}>
            <div className={styles.thumbnailsViewport}>
              <div
                className={styles.thumbnailsTrack}
                style={{
                  transform: `translateX(-${thumbOffset * thumbStep}px)`,
                  transitionDuration: thumbTransitionEnabled ? "400ms" : "0ms",
                }}
              >
                {thumbsLoop.map((slide, index) => {
                  const originalIndex = index % slides.length;
                  return (
                    <button
                      key={`${slide.id}-${index}`}
                      className={`${styles.thumb} ${originalIndex === activeIndex ? styles.thumbActive : ""
                        }`}
                      onClick={() => goToSlide(originalIndex)}
                      aria-label={`Slide ${originalIndex + 1}`}
                    >
                      <Image
                        src={slide.thumb}
                        alt={`Thumbnail ${originalIndex + 1}`}
                        fill
                        className={styles.thumbImage}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              className={styles.arrowBtn}
              onClick={goNext}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="90" height="56" viewBox="0 0 90 56" fill="none">
                <path d="M67.6697 13.8367L81.833 28L67.6697 42.1633" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 28L81 28" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
