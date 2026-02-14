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
}

export default function ProductCard({ slug, image, brand, title }: ProductCardProps) {
  const t = useTranslations("common");

  return (
    <div className={styles.card}>
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
