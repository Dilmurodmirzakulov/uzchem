"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("common");
  const tFooter = useTranslations("footer");

  const navLinks = [
    { href: "/catalog" as const, label: t("catalog") },
    { href: "/objects" as const, label: t("objects") },
    { href: "/news" as const, label: t("news") },
    { href: "/contacts" as const, label: t("contacts") },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <Link href="/" className={styles.logoLink}>
              <img src="/images/footer/logo.svg" alt="UZCHEM" className={styles.logoImage} />
            </Link>
          </div>

          <nav className={styles.footerNav}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footerLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.footerContact}>
            <a href="tel:+998712310909" className={styles.footerPhone}>
              <span className={styles.phonePrefix}>+99871</span> 231 09 09
            </a>
            <a href="tel:+998971575859" className={styles.footerPhone}>
              <span className={styles.phonePrefix}>+99897</span> 157 58 59
            </a>
            <a href="mailto:info.uzchem@gmail.com" className={styles.footerEmail}>
              info.uzchem@gmail.com
            </a>
            <p className={styles.footerAddress}>
              {tFooter("address").split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </p>

            <div className={styles.socialIcons}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <span className={styles.instagramIconWrap}>
                  <img src="/images/footer/instagram-outline.svg" alt="" aria-hidden="true" className={styles.instagramOutline} />
                  <img src="/images/footer/instagram-inner.svg" alt="" aria-hidden="true" className={styles.instagramInner} />
                </span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <img src="/images/footer/facebook.svg" alt="" aria-hidden="true" className={styles.socialAssetIcon} />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Telegram">
                <img src="/images/footer/telegram.svg" alt="" aria-hidden="true" className={styles.socialAssetIcon} />
              </a>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.footerBottom}>
        <p>&copy; Uzchem, 2025</p>
      </div>
    </footer>
  );
}
