"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import NewsCard from "@/components/NewsCard/NewsCard";
import Modal from "@/components/Modal/Modal";
import styles from "./page.module.css";

interface NewsItem {
  slug: string;
  image: string;
  title: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

const newsItems: NewsItem[] = [
  {
    slug: "kak-vybrat-vannu",
    image: "/images/news/news-detail-1.jpg",
    title: "Как выбрать ванну",
    sections: [
      {
        heading: "Разновидности ванн",
        paragraphs: [
          "Богатый ассортимент форм, размеров и материалов позволяет с легкостью подобрать вариант, который сможет полностью удовлетворить требованиям и вписаться в оформление ванной комнаты любого размера. Сегодня предлагаются ванны с дополнительно установленными специальными опциями, которые позволяет существенно повысить функциональность сантехнического оборудования.",
          "Для изготовления ванн используются различные материалы: натуральный камень, стекло, полимеры, чугун, сталь и даже натуральное дерево.",
          "Рассмотрим самые популярные варианты ванн.",
        ],
      },
      {
        heading: "Чугунные ванны: особенности и преимущества",
        paragraphs: [
          "Чаще всего ванны производятся из чугуна. Связанно это с его неоспоримыми преимуществами: прочность и стойкость к нагрузкам, хорошая теплоемкость, отсутствие звона при падении капель воды.",
          "Старые привычные чугунные ванны имели стандартные размеры и овальную форму. Современное производство позволяет выполнять эти ванны более оригинальных форм, например, асимметричной. Основное преимущество таких ванн в том, что для их установки не требуется много пространства, занимается только угол помещения.",
          "Асимметричные чугунные ванны способны стать достойным украшением и функциональным дополнением для ванных комнат любых размеров. При выборе и покупке чугунной ванны особое внимание следует уделить качеству поверхности и ее оттенку.",
        ],
      },
    ],
  },
  {
    slug: "kak-vybrat-podlozhku-pod-laminat",
    image: "/images/news/news-1.jpg",
    title: "Как выбрать подложку под ламинат",
    sections: [
      {
        heading: "Как выбрать подложку",
        paragraphs: [
          "Правильный выбор подложки под ламинат — залог долговечности напольного покрытия.",
          "Подложка снижает шум, компенсирует неровности и улучшает теплоизоляцию.",
        ],
      },
    ],
  },
  {
    slug: "kak-rasschitat-laminat",
    image: "/images/news/news-1.jpg",
    title: "Как рассчитать количество ламината на комнату",
    sections: [
      {
        heading: "Расчет количества ламината",
        paragraphs: [
          "Правильный расчет помогает избежать лишних затрат и нехватки материала.",
          "Учитывайте площадь комнаты, запас на подрезку и схему укладки.",
        ],
      },
    ],
  },
  {
    slug: "kak-vyrovnyat-pol",
    image: "/images/news/news-1.jpg",
    title: "Как выровнять пол под ламинат",
    sections: [
      {
        heading: "Подготовка основания",
        paragraphs: [
          "Ровное основание — обязательное условие для укладки ламината.",
          "Перед монтажом проверьте перепады высот и подберите подходящий способ выравнивания.",
        ],
      },
    ],
  },
];

export default function NewsPage() {
  const t = useTranslations("news");
  const tc = useTranslations("common");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <>
      <section className={styles.heroDesktop}>
        <Image
          src="/images/news/news-hero.jpg"
          alt={t("title")}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroGreenShape} />
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{t("title")}</h1>
            <div className={styles.heroBreadcrumbs}>
              <span className={styles.heroBreadcrumbMuted}>{tc("home")}</span>
              <span className={styles.heroBreadcrumbDot}>•</span>
              <span>{t("title")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.heroMobile}>
        <div className={styles.heroMobileTop}>
          <div className="container">
            <div className={styles.heroMobileContent}>
              <h1 className={styles.heroMobileTitle}>{t("title")}</h1>
              <div className={styles.heroMobileBreadcrumbs}>
                <span className={styles.heroMobileBreadcrumbMuted}>{tc("home")}</span>
                <span className={styles.heroMobileBreadcrumbDot}>•</span>
                <span>{t("title")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroMobileImageWrap}>
          <Image
            src="/images/news/news-hero.jpg"
            alt={t("title")}
            fill
            priority
            className={styles.heroMobileImage}
          />
        </div>
      </section>

      <section className={styles.newsSection}>
        <div className="container">
          <div className={styles.newsGrid}>
            {newsItems.map((item) => (
              <div key={item.slug} className={styles.newsItem}>
                <NewsCard
                  image={item.image}
                  title={item.title}
                  onClick={() => setSelectedNews(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Detail Side Modal */}
      <Modal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        variant="panel"
        contentClassName={styles.newsModalContentShell}
        closeButtonClassName={styles.newsModalCloseBtn}
      >
        {selectedNews && (
          <div className={styles.modalContent}>
            <div className={styles.modalScrollArea}>
              <div className={styles.modalImage}>
                <Image
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  fill
                  className={styles.modalImg}
                />
              </div>

              {selectedNews.sections.map((section) => (
                <section className={styles.modalSection} key={section.heading}>
                  <h2 className={styles.modalSectionTitle}>{section.heading}</h2>
                  <div className={styles.modalSectionText}>
                    {section.paragraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
