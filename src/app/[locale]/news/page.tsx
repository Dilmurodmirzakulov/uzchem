"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PageBanner from "@/components/PageBanner/PageBanner";
import NewsCard from "@/components/NewsCard/NewsCard";
import Modal from "@/components/Modal/Modal";
import styles from "./page.module.css";

interface NewsItem {
  slug: string;
  image: string;
  title: string;
  date: string;
  content: string;
}

const newsItems: NewsItem[] = [
  {
    slug: "kak-vybrat-vannu",
    image: "/images/placeholder-news.svg",
    title: "Как выбрать ванну",
    date: "15 января 2025",
    content:
      "При выборе ванны необходимо учитывать множество факторов: размер помещения, материал изготовления, тип установки и бюджет. В этой статье мы рассмотрим основные критерии выбора и поможем определиться с оптимальным вариантом.",
  },
  {
    slug: "kak-vybrat-podlozhku-pod-laminat",
    image: "/images/placeholder-news.svg",
    title: "Как выбрать подложку под ламинат",
    date: "10 января 2025",
    content:
      "Правильный выбор подложки под ламинат — залог долговечности напольного покрытия. Рассказываем, на что обратить внимание при выборе.",
  },
  {
    slug: "kak-rasschitat-laminat",
    image: "/images/placeholder-news.svg",
    title: "Как рассчитать количество ламината на комнату",
    date: "5 января 2025",
    content:
      "Правильный расчёт количества ламината поможет избежать лишних затрат. В этой статье мы расскажем, как точно рассчитать нужное количество.",
  },
  {
    slug: "kak-vyrovnyat-pol",
    image: "/images/placeholder-news.svg",
    title: "Как выровнять пол под ламинат",
    date: "28 декабря 2024",
    content:
      "Ровное основание — обязательное условие для укладки ламината. Рассмотрим основные способы выравнивания пола.",
  },
];

export default function NewsPage() {
  const t = useTranslations("news");
  const tc = useTranslations("common");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <>
      <PageBanner
        title={t("title")}
        breadcrumbs={[
          { label: tc("home"), href: "/" },
          { label: t("title") },
        ]}
      />

      <section className={`section ${styles.newsSection}`}>
        <div className="container">
          <div className="row g-4">
            {newsItems.map((item) => (
              <div key={item.slug} className="col-md-6">
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
        variant="side"
      >
        {selectedNews && (
          <div className={styles.modalContent}>
            <div className={styles.modalImage}>
              <Image
                src={selectedNews.image}
                alt={selectedNews.title}
                width={460}
                height={280}
                className={styles.modalImg}
              />
            </div>
            <time className={styles.modalDate}>{selectedNews.date}</time>
            <h2 className={styles.modalTitle}>{selectedNews.title}</h2>
            <p className={styles.modalText}>{selectedNews.content}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
