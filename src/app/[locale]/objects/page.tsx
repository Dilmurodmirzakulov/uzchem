"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PageBanner from "@/components/PageBanner/PageBanner";
import ObjectCard from "@/components/ObjectCard/ObjectCard";
import Modal from "@/components/Modal/Modal";
import styles from "./page.module.css";

interface ObjectItem {
  image: string;
  title: string;
  description: string;
  gallery: string[];
}

const objects: Record<string, ObjectItem[]> = {
  residential: [
    {
      image: "/images/placeholder-object.svg",
      title: "Navruz Residence",
      description:
        "Современный жилой комплекс, расположенный в центральной части Ташкента. При отделке использованы строительные материалы высшего качества от UZCHEM.",
      gallery: [
        "/images/placeholder-object.svg",
        "/images/placeholder-object.svg",
        "/images/placeholder-object.svg",
      ],
    },
    {
      image: "/images/placeholder-object.svg",
      title: "Yangi Hayot",
      description:
        "Жилой комплекс нового формата с инфраструктурой мирового уровня.",
      gallery: ["/images/placeholder-object.svg", "/images/placeholder-object.svg"],
    },
    {
      image: "/images/placeholder-object.svg",
      title: "Orzu Towers",
      description: "Многоэтажный жилой комплекс премиального класса.",
      gallery: ["/images/placeholder-object.svg"],
    },
    {
      image: "/images/placeholder-object.svg",
      title: "Mehr Residence",
      description: "Уютный жилой комплекс с развитой инфраструктурой.",
      gallery: ["/images/placeholder-object.svg"],
    },
    {
      image: "/images/placeholder-object.svg",
      title: "Baraka Homes",
      description: "Современное жильё для комфортной жизни.",
      gallery: ["/images/placeholder-object.svg"],
    },
    {
      image: "/images/placeholder-object.svg",
      title: "Nur City",
      description: "Масштабный жилой проект в пригороде Ташкента.",
      gallery: ["/images/placeholder-object.svg"],
    },
  ],
  commercial: [
    {
      image: "/images/placeholder-object.svg",
      title: "Business Center Alpha",
      description: "Современный бизнес-центр класса А.",
      gallery: ["/images/placeholder-object.svg"],
    },
    {
      image: "/images/placeholder-object.svg",
      title: "Trade Center Beta",
      description: "Торговый центр нового поколения.",
      gallery: ["/images/placeholder-object.svg"],
    },
  ],
};

export default function ObjectsPage() {
  const t = useTranslations("objects");
  const tc = useTranslations("common");
  const [activeType, setActiveType] = useState("residential");
  const [selectedObject, setSelectedObject] = useState<ObjectItem | null>(null);

  const objectTypes = [
    { key: "residential", label: t("residential") },
    { key: "commercial", label: t("commercial") },
  ];

  const currentObjects = objects[activeType] || objects.residential;

  return (
    <>
      <PageBanner
        title={t("title")}
        breadcrumbs={[
          { label: tc("home"), href: "/" },
          { label: t("title") },
        ]}
      />

      <section className={`section ${styles.objectsSection}`}>
        <div className="container">
          <div className={styles.header}>
            <h2 className={styles.title}>{t("typesTitle")}</h2>
            <div className={styles.tabs}>
              {objectTypes.map((type) => (
                <button
                  key={type.key}
                  className={`${styles.tab} ${
                    activeType === type.key ? styles.tabActive : ""
                  }`}
                  onClick={() => setActiveType(type.key)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {currentObjects.map((obj, index) => (
              <div key={index} className="col-md-6">
                <ObjectCard
                  image={obj.image}
                  title={obj.title}
                  onClick={() => setSelectedObject(obj)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Object Fullscreen Modal */}
      <Modal
        isOpen={!!selectedObject}
        onClose={() => setSelectedObject(null)}
        variant="fullscreen"
      >
        {selectedObject && (
          <div className={styles.modalContent}>
            {/* Hero image area */}
            <div className={styles.modalHero}>
              <Image
                src={selectedObject.image}
                alt={selectedObject.title}
                fill
                className={styles.modalHeroImg}
              />
              <div className={styles.modalHeroOverlay} />
              <div className={styles.modalHeroText}>
                <h1 className={styles.modalTitle}>{selectedObject.title}</h1>
              </div>
            </div>

            {/* Content area */}
            <div className={styles.modalBody}>
              <div className="container">
                <p className={styles.modalDesc}>{selectedObject.description}</p>

                {/* Gallery */}
                {selectedObject.gallery.length > 0 && (
                  <div className={styles.gallery}>
                    <div className="row g-3">
                      {selectedObject.gallery.map((img, i) => (
                        <div
                          key={i}
                          className={
                            i === 0 ? "col-12" : "col-md-6"
                          }
                        >
                          <div className={styles.galleryItem}>
                            <Image
                              src={img}
                              alt={`${selectedObject.title} ${i + 1}`}
                              width={800}
                              height={450}
                              className={styles.galleryImg}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
