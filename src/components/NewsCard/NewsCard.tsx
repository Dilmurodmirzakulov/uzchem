"use client";

import Image from "next/image";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
  image: string;
  title: string;
  onClick?: () => void;
}

export default function NewsCard({ image, title, onClick }: NewsCardProps) {
  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
        />
        <div className={styles.plusIcon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="10" y1="4" x2="10" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="10" x2="16" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}
