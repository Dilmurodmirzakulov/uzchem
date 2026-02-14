import Image from "next/image";
import styles from "./SupplierCard.module.css";

interface SupplierCardProps {
  image: string;
  name: string;
  href?: string;
}

export default function SupplierCard({ image, name, href }: SupplierCardProps) {
  const content = (
    <div className={styles.card}>
      <div className={styles.circle}>
        <Image
          src={image}
          alt={name}
          width={100}
          height={50}
          className={styles.logo}
        />
      </div>
      <div className={styles.indicator} />
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
