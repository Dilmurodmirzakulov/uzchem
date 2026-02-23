"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  slug: string;
  image: string;
  brand: string;
  title: string;
  mobileView?: "one" | "two";
}

export default function ProductCard({ slug, image, brand, title, mobileView }: ProductCardProps) {
  const t = useTranslations("common");
  const mobileViewClass = mobileView === "one"
    ? styles.mobileOne
    : mobileView === "two"
      ? styles.mobileTwo
      : "";

  return (
    <div className={`${styles.card} ${mobileViewClass}`.trim()}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.brand}>
          {t("brand")}: <span className={styles.brandName}>{brand}</span>
        </p>
        <h4 className={styles.title}>{title}</h4>
      </div>
      <Link href={`/catalog/${slug}`} className={styles.btn}>
        {t("more")}
      </Link>
    </div>
  );
}
