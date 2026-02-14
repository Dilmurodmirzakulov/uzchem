"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./PartnersSection.module.css";

type PartnerCard = {
  number: string;
  titleKey: string;
  descriptionKey: string;
};

const cards: PartnerCard[] = [
  {
    number: "01",
    titleKey: "partnerSlide1Title",
    descriptionKey: "partnerSlide1Desc",
  },
  {
    number: "02",
    titleKey: "partnerSlide2Title",
    descriptionKey: "partnerSlide2Desc",
  },
  {
    number: "03",
    titleKey: "partnerSlide3Title",
    descriptionKey: "partnerSlide3Desc",
  },
  {
    number: "04",
    titleKey: "partnerSlide4Title",
    descriptionKey: "partnerSlide4Desc",
  },
];

const backgroundImages = [
  "/images/banners/banner-1.jpg",
  "/images/banners/banner-2.jpg",
  "/images/banners/banner-3.jpg",
  "/images/banners/banner-4.jpg",
];

export default function PartnersSection() {
  const t = useTranslations("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(720);
  const [isMobile, setIsMobile] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === cards.length - 1;

  useEffect(() => {
    const updateOffset = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);

      if (width <= 1199) {
        const viewportWidth = viewportRef.current?.clientWidth ?? 0;
        setSlideOffset(viewportWidth + 16);
        return;
      }

      if (width <= 1600) {
        setSlideOffset(570);
        return;
      }

      setSlideOffset(720);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return (
    <section className={styles.partners}>
      {/* Mobile-only title rendered above the image */}
      <div className={`container ${styles.mobileTitleWrap}`}>
        <h2 className={styles.mobileTitle}>{t("partnersTitle")}</h2>
      </div>

      <div className={styles.sliderLayout}>
        <div className={styles.backgroundFrame}>
          <Image
            src={backgroundImages[activeIndex]}
            alt=""
            fill
            priority={false}
            className={styles.backgroundImage}
            aria-hidden
          />
        </div>

        <div className={`container ${styles.contentContainer}`}>
          <div className={styles.contentLayer}>
            <h2 className={styles.title}>{t("partnersTitle")}</h2>

            <div className={styles.viewport} ref={viewportRef}>
              <div
                className={styles.track}
                style={isMobile ? undefined : { transform: `translateX(-${activeIndex * slideOffset}px)` }}
              >
                {cards.map((card) => (
                  <article key={card.number} className={styles.card}>
                    <div className={styles.cardTop}>
                      <h3 className={styles.cardTitle}>{t(card.titleKey)}</h3>
                      <span className={styles.cardNumber}>{card.number}</span>
                    </div>
                    <p className={styles.cardDescription}>{t(card.descriptionKey)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.navigation}>
              <button
                type="button"
                className={styles.navButton}
                onClick={() => setActiveIndex((prev) => prev - 1)}
                disabled={isPrevDisabled}
                aria-label="Previous slide"
              >
                <Image
                  src="/images/suppliers/arrow-left.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonNext}`}
                onClick={() => setActiveIndex((prev) => prev + 1)}
                disabled={isNextDisabled}
                aria-label="Next slide"
              >
                <Image
                  src="/images/suppliers/arrow-left.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}