"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import styles from "./Header.module.css";

export default function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = pathname === "/" || pathname === "";
  const isObjectsPage = pathname === "/objects";
  const isNewsPage = pathname === "/news";
  const isContactsPage = pathname === "/contacts";
  const isHeroPage = isHomePage || isObjectsPage || isNewsPage || isContactsPage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHeroPage && !scrolled && !mobileMenuOpen;
  const isMobileTopState = isHeroPage && !scrolled && !mobileMenuOpen;

  const navLinks = [
    { href: "/news" as const, label: t("news") },
    { href: "/objects" as const, label: t("objects") },
    { href: "/contacts" as const, label: t("contacts") },
  ];

  const mobileNavLinks = [
    { href: "/catalog" as const, label: t("catalog") },
    { href: "/objects" as const, label: t("objects") },
    { href: "/news" as const, label: t("news") },
    { href: "/contacts" as const, label: t("contacts") },
  ];

  const locales = [
    { code: "uz" as const, label: "O'z" },
    { code: "ru" as const, label: "Ру" },
    { code: "en" as const, label: "En" },
  ];

  const currentLocaleLabel =
    locales.find((l) => l.code === locale)?.label || "O'z";

  const switchLocale = (newLocale: "uz" | "ru" | "en") => {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${isTransparent ? styles.headerTransparent : styles.headerSolid}`}
      >
        <div className="container">
          <div className={styles.headerInner}>
            {/* Left: Catalog button + Nav links */}
            <div className={styles.headerLeft}>
              <Link href="/catalog" className={styles.catalogBtn}>
                <span className={styles.catalogIcon}>
                  <img src="/images/header/catalog-dots.svg" alt="" aria-hidden="true" className={styles.catalogIconImage} />
                </span>
                {t("catalog")}
              </Link>

              <nav className={styles.nav}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.navLink} ${pathname === link.href ? styles.navLinkActive : ""
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <Link href="/" className={styles.logo}>
              <img src="/images/header/logo-mark.svg" alt="UZCHEM" className={`${styles.logoImage} ${styles.logoImageTransparent}`} />
              <img src="/images/header/logo-mark-solid.svg" alt="UZCHEM" className={`${styles.logoImage} ${styles.logoImageSolid}`} />
            </Link>

            {/* Right: Social icons + Language + Phone */}
            <div className={styles.headerRight}>
              <div className={styles.socialIcons}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                  <span className={`${styles.instagramIconWrap} ${styles.iconTransparent}`}>
                    <img src="/images/header/instagram-outline.svg" alt="" aria-hidden="true" className={styles.instagramOutline} />
                    <img src="/images/header/instagram-inner.svg" alt="" aria-hidden="true" className={styles.instagramInner} />
                  </span>
                  <span className={`${styles.instagramIconWrap} ${styles.iconSolid}`}>
                    <img src="/images/header/instagram-outline-solid.svg" alt="" aria-hidden="true" className={styles.instagramOutline} />
                    <img src="/images/header/instagram-inner-solid.svg" alt="" aria-hidden="true" className={styles.instagramInner} />
                  </span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                  <img src="/images/header/facebook.svg" alt="" aria-hidden="true" className={`${styles.socialAssetIcon} ${styles.iconTransparent}`} />
                  <img src="/images/header/facebook-solid.svg" alt="" aria-hidden="true" className={`${styles.socialAssetIcon} ${styles.iconSolid}`} />
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Telegram">
                  <img src="/images/header/telegram.svg" alt="" aria-hidden="true" className={`${styles.socialAssetIcon} ${styles.iconTransparent}`} />
                  <img src="/images/header/telegram-solid.svg" alt="" aria-hidden="true" className={`${styles.socialAssetIcon} ${styles.iconSolid}`} />
                </a>
              </div>

              {/* Language Switcher */}
              <div className={styles.langWrapper}>
                <button
                  className={styles.langSwitcher}
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                >
                  {currentLocaleLabel}
                </button>
                {langMenuOpen && (
                  <div className={styles.langDropdown}>
                    {locales
                      .filter((l) => l.code !== locale)
                      .map((l) => (
                        <button
                          key={l.code}
                          className={styles.langOption}
                          onClick={() => switchLocale(l.code)}
                        >
                          {l.label}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <a href="tel:+998712310909" className={styles.phone}>
                <span className={styles.phonePrefix}>+99871</span> 231 09 09
              </a>
            </div>
          </div>

          <div className={`${styles.mobileBar} ${isMobileTopState ? styles.mobileBarTopState : ""}`}>
            <Link href="/" className={styles.mobileLogo}>
              <div className={styles.mobileLogoIcon}>
                <img
                  src="/images/header/logo-mark.svg"
                  alt="UZCHEM"
                  className={`${styles.mobileLogoImg} ${styles.mobileLogoImgTransparent}`}
                />
                <img
                  src="/images/header/logo-mark-solid.svg"
                  alt="UZCHEM"
                  className={`${styles.mobileLogoImg} ${styles.mobileLogoImgSolid}`}
                />
              </div>
              {/* <div className={styles.mobileLogoText}>
                <span className={styles.mobileLogoName}>uzchem</span>
                <span className={styles.mobileLogoTagline}>A Family Company</span>
              </div> */}
            </Link>

            <div className={styles.mobileControls}>
              <div className={styles.mobileLangWrapper}>
                <button
                  className={`${styles.mobileLangSwitcher} ${isMobileTopState ? styles.mobileLangSwitcherTopState : ""}`}
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  aria-label="Switch language"
                >
                  {currentLocaleLabel}
                </button>
                {langMenuOpen && (
                  <div className={styles.mobileLangDropdown}>
                    {locales
                      .filter((l) => l.code !== locale)
                      .map((l) => (
                        <button
                          key={l.code}
                          className={styles.mobileLangOption}
                          onClick={() => switchLocale(l.code)}
                        >
                          {l.label}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <button
                className={`${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.mobileMenuToggleOpen : ""} ${isMobileTopState ? styles.mobileMenuToggleTopState : ""}`}
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setLangMenuOpen(false);
                }}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <span className={`${styles.mobileMenuIcon} ${mobileMenuOpen ? styles.mobileMenuIconOpen : ""} ${isMobileTopState ? styles.mobileMenuIconTopState : ""}`} />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className={styles.mobileMenuPanel}>
              <nav className={styles.mobileMenuList}>
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.mobileMenuItem}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4 10H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M11.5 5.5L16 10L11.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </nav>

              <div className={styles.mobileMenuContacts}>
                <a href="tel:+998712310909" className={styles.mobileMenuPhone}>
                  <span className={styles.mobileMenuPhonePrefix}>+99871</span> 231 09 09
                </a>
                <a href="tel:+998971575859" className={styles.mobileMenuPhone}>
                  <span className={styles.mobileMenuPhonePrefix}>+99897</span> 157 58 59
                </a>
                <a href="mailto:info.uzchem@gmail.com" className={styles.mobileMenuEmail}>
                  info.uzchem@gmail.com
                </a>
                <p className={styles.mobileMenuAddress}>Ташкенская обл, Кибрайский р-н, улица Карамурт, 2А</p>

                <div className={styles.mobileMenuSocials}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.mobileMenuSocial} aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.mobileMenuSocial} aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer" className={styles.mobileMenuSocial} aria-label="Telegram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      {!isHeroPage && <div className={styles.headerSpacer} />}
    </>
  );
}
