import { Link } from "@/i18n/routing";
import styles from "./PageBanner.module.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageBanner({ title, breadcrumbs }: PageBannerProps) {
  return (
    <section className={styles.banner}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumbs}>
            {breadcrumbs.map((item, index) => (
              <span key={index} className={styles.breadcrumbItem}>
                {index > 0 && <span className={styles.separator}>&gt;</span>}
                {item.href ? (
                  <Link href={item.href} className={styles.breadcrumbLink}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.breadcrumbCurrent}>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
