"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import SuppliersSection from "@/components/SuppliersSection/SuppliersSection";
import PartnersSection from "@/components/PartnersSection/PartnersSection";
import UzbekistanMap from "@/components/UzbekistanMap/UzbekistanMap";
import styles from "@/app/[locale]/page.module.css";

export default function HomeContentClient() {
  const t = useTranslations("home");
  const [activeStep, setActiveStep] = useState(0);

  const aboutSteps = [
    {
      text: t("aboutStep1"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M43.2001 26.125L52.5 16.825L43.2001 7.52502" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 16.825H52.5" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.7999 33.875L7.5 43.1751L16.7999 52.475" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M52.5 43.175H7.5" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      text: t("aboutStep2"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30.0004 35H32.5004C35.2504 35 37.5004 32.75 37.5004 30V5H15.0004C11.2504 5 7.97539 7.07497 6.27539 10.125" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 42.5C5 46.65 8.35 50 12.5 50H15C15 47.25 17.25 45 20 45C22.75 45 25 47.25 25 50H35C35 47.25 37.25 45 40 45C42.75 45 45 47.25 45 50H47.5C51.65 50 55 46.65 55 42.5V35H47.5C46.125 35 45 33.875 45 32.5V25C45 23.625 46.125 22.5 47.5 22.5H50.7249L46.45 15.025C45.55 13.475 43.9001 12.5 42.1001 12.5H37.5V30C37.5 32.75 35.25 35 32.5 35H30" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 55C22.7614 55 25 52.7614 25 50C25 47.2386 22.7614 45 20 45C17.2386 45 15 47.2386 15 50C15 52.7614 17.2386 55 20 55Z" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 55C42.7614 55 45 52.7614 45 50C45 47.2386 42.7614 45 40 45C37.2386 45 35 47.2386 35 50C35 52.7614 37.2386 55 40 55Z" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M55 30V35H47.5C46.125 35 45 33.875 45 32.5V25C45 23.625 46.125 22.5 47.5 22.5H50.7249L55 30Z" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 20H20" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 27.5H15" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 35H10" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      text: t("aboutStep3"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M15 30H45" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 35C12.7614 35 15 32.7614 15 30C15 27.2386 12.7614 25 10 25C7.23858 25 5 27.2386 5 30C5 32.7614 7.23858 35 10 35Z" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M45 10H35C30 10 27.5 12.5 27.5 17.5V42.5C27.5 47.5 30 50 35 50H45" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 35C52.7614 35 55 32.7614 55 30C55 27.2386 52.7614 25 50 25C47.2386 25 45 27.2386 45 30C45 32.7614 47.2386 35 50 35Z" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 15C52.7614 15 55 12.7614 55 10C55 7.23858 52.7614 5 50 5C47.2386 5 45 7.23858 45 10C45 12.7614 47.2386 15 50 15Z" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 55C52.7614 55 55 52.7614 55 50C55 47.2386 52.7614 45 50 45C47.2386 45 45 47.2386 45 50C45 52.7614 47.2386 55 50 55Z" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      text: t("aboutStep4"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M50.625 31.875L47.1094 7.24219C47.0473 6.79483 46.8258 6.38491 46.4856 6.0878C46.1454 5.79069 45.7095 5.62636 45.2578 5.625H40.9922C40.5405 5.62636 40.1046 5.79069 39.7644 6.0878C39.4242 6.38491 39.2027 6.79483 39.1406 7.24219L35.9766 29.3437" stroke="#61B405" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.75 41.25H25.3125" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34.6875 41.25H41.25" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50.625 50.625V31.875H39.375L24.375 20.625V31.875L9.375 20.625V50.625" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.75 50.625H56.25" stroke="#02247B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <HeroBanner />

      <section className={`section ${styles.about}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t("aboutTitle")}</h2>
          <div className={styles.aboutMobile}>
            <input className={styles.aboutMobileInput} type="radio" id="about-mobile-tab-1" name="about-mobile-tabs" defaultChecked />
            <input className={styles.aboutMobileInput} type="radio" id="about-mobile-tab-2" name="about-mobile-tabs" />
            <input className={styles.aboutMobileInput} type="radio" id="about-mobile-tab-3" name="about-mobile-tabs" />
            <input className={styles.aboutMobileInput} type="radio" id="about-mobile-tab-4" name="about-mobile-tabs" />

            <div className={styles.aboutMobileTabs}>
              <label htmlFor="about-mobile-tab-1" className={`${styles.aboutMobileTab} ${styles.aboutMobileTab1}`}>01</label>
              <label htmlFor="about-mobile-tab-2" className={`${styles.aboutMobileTab} ${styles.aboutMobileTab2}`}>02</label>
              <label htmlFor="about-mobile-tab-3" className={`${styles.aboutMobileTab} ${styles.aboutMobileTab3}`}>03</label>
              <label htmlFor="about-mobile-tab-4" className={`${styles.aboutMobileTab} ${styles.aboutMobileTab4}`}>04</label>
            </div>

            <div className={styles.aboutMobileCards}>
              {aboutSteps.map((step, i) => (
                <article key={`mobile-${i}`} className={`${styles.aboutMobileCard} ${styles[`aboutMobileCard${i + 1}`]}`}>
                  <p className={styles.aboutMobileText}>{step.text}</p>
                  <span className={styles.aboutMobileNumber}>{String(i + 1).padStart(2, "0")}</span>
                  <div className={styles.aboutMobileIcon}>{step.icon}</div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.aboutCards}>
            {aboutSteps.map((step, i) => (
              <div
                key={i}
                className={`${styles.aboutStep} ${activeStep === i ? styles.aboutStepActive : ""}`}
                onMouseEnter={() => setActiveStep(i)}
              >
                <div className={styles.aboutIcon}>{step.icon}</div>
                <p className={styles.aboutText}>{step.text}</p>
                <span className={styles.aboutNumber}>{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.nearby}>
        <div className="container">
          <div className={styles.nearbyGrid}>
            <h2 className={styles.nearbyTitle}>{t("nearbyTitle")}</h2>

            <div className={styles.nearbyMapColumn}>
              <div className={styles.nearbyMap}>
                <UzbekistanMap />
              </div>
              <p className={styles.nearbyDesc}>{t("nearbyDesc")}</p>
            </div>

            <div className={styles.nearbyInfoColumn}>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>5 200 m²</span>
                  <span className={styles.statLabel}>{t("statArea")}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>120+</span>
                  <span className={styles.statLabel}>{t("statProducts")}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>48</span>
                  <span className={styles.statLabel}>{t("statObjects")}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>14</span>
                  <span className={styles.statLabel}>{t("statRegions")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SuppliersSection />

      <PartnersSection />
    </>
  );
}
