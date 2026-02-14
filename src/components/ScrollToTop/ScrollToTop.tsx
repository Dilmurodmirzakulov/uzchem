"use client";

import { useState, useEffect } from "react";
import styles from "./ScrollToTop.module.css";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className={styles.button}
      onClick={scrollToTop}
      aria-label="Наверх"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <line x1="10" y1="4" x2="10" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="10" x2="16" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
