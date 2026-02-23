"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ObjectCard from "@/components/ObjectCard/ObjectCard";
import Modal from "@/components/Modal/Modal";
import styles from "./page.module.css";

interface ObjectItem {
  image: string;
  title: string;
  description: string;
  gallery: string[];
  products: {
    image: string;
    brand: string;
    title: string;
    slug: string;
  }[];
}

const objects: Record<string, ObjectItem[]> = {
  residential: [
    {
      image: "/images/objects/navruz.jpg",
      title: "Navruz Residence",
      description:
        "Современный жилой комплекс, расположенный в центральной части Ташкента. При отделке использованы строительные материалы высшего качества от UZCHEM.",
      gallery: [
        "/images/objects/navruz.jpg",
        "/images/objects/yangi.jpg",
        "/images/objects/orzu.jpg",
      ],
      products: [
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Megamix",
          title: "Фасадная шпаклевка Megamix White Facade",
          slug: "facade-megamix",
        },
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Knauf",
          title: "КНАУФ-профиль UA усиленный 75x40x2.0 мм",
          slug: "knauf-profile-ua",
        },
      ],
    },
    {
      image: "/images/objects/yangi.jpg",
      title: "Yangi Hayot",
      description:
        "Жилой комплекс нового формата с инфраструктурой мирового уровня.",
      gallery: ["/images/objects/yangi.jpg", "/images/objects/mehr.jpg"],
      products: [
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Megamix",
          title: "Фасадная шпаклевка Megamix White Facade",
          slug: "facade-megamix",
        },
      ],
    },
    {
      image: "/images/objects/orzu.jpg",
      title: "Orzu Towers",
      description: "Многоэтажный жилой комплекс премиального класса.",
      gallery: ["/images/objects/orzu.jpg"],
      products: [
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Megamix",
          title: "Фасадная шпаклевка Megamix White Facade",
          slug: "facade-megamix",
        },
      ],
    },
    {
      image: "/images/objects/mehr.jpg",
      title: "Mehr Residence",
      description: "Уютный жилой комплекс с развитой инфраструктурой.",
      gallery: [
        "/images/objects/mehr.jpg",
        "/images/objects/mehr.jpg",
        "/images/objects/mehr.jpg",
        "/images/objects/mehr.jpg",
      ],
      products: [
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Megamix",
          title: "Фасадная шпаклевка Megamix White Facade",
          slug: "facade-megamix",
        },
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Knauf",
          title: "КНАУФ-профиль UA усиленный 75x40x2.0 мм",
          slug: "knauf-profile-ua",
        },
      ],
    },
    {
      image: "/images/objects/baraka.jpg",
      title: "Baraka Homes",
      description: "Современное жильё для комфортной жизни.",
      gallery: ["/images/objects/baraka.jpg"],
      products: [
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Megamix",
          title: "Фасадная шпаклевка Megamix White Facade",
          slug: "facade-megamix",
        },
      ],
    },
    {
      image: "/images/objects/nur.jpg",
      title: "Nur City",
      description: "Масштабный жилой проект в пригороде Ташкента.",
      gallery: ["/images/objects/nur.jpg"],
      products: [
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Megamix",
          title: "Фасадная шпаклевка Megamix White Facade",
          slug: "facade-megamix",
        },
      ],
    },
  ],
  commercial: [
    {
      image: "/images/objects/hero.jpg",
      title: "Business Center Alpha",
      description: "Современный бизнес-центр класса А.",
      gallery: ["/images/objects/hero.jpg"],
      products: [
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Megamix",
          title: "Фасадная шпаклевка Megamix White Facade",
          slug: "facade-megamix",
        },
      ],
    },
    {
      image: "/images/objects/hero.jpg",
      title: "Trade Center Beta",
      description: "Торговый центр нового поколения.",
      gallery: ["/images/objects/hero.jpg"],
      products: [
        {
          image: "/images/products/megamix-satin-gyps.png",
          brand: "Megamix",
          title: "Фасадная шпаклевка Megamix White Facade",
          slug: "facade-megamix",
        },
      ],
    },
  ],
};

export default function ObjectsPage() {
  const t = useTranslations("objects");
  const tc = useTranslations("common");
  const [activeType, setActiveType] = useState("residential");
  const [selectedObject, setSelectedObject] = useState<ObjectItem | null>(null);
  const [showMobileProducts, setShowMobileProducts] = useState(false);

  const openObjectModal = (obj: ObjectItem) => {
    setShowMobileProducts(false);
    setSelectedObject(obj);
  };

  const objectTypes = [
    { key: "residential", label: t("residential") },
    { key: "commercial", label: t("commercial") },
  ];

  const currentObjects = objects[activeType] || objects.residential;

  return (
    <>
      <section className={styles.heroDesktop}>
        <Image
          src="/images/objects/hero.jpg"
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
            src="/images/objects/hero.jpg"
            alt={t("title")}
            fill
            priority
            className={styles.heroMobileImage}
          />
        </div>
      </section>

      <section className={styles.objectsSection}>
        <div className="container">
          <div className={styles.topRow}>
            <h2 className={styles.typesTitle}>{t("typesTitle")}</h2>
            <div className={styles.tabsWrap}>
              {objectTypes.map((type) => (
                <button
                  key={type.key}
                  className={`${styles.tab} ${activeType === type.key ? styles.tabActive : ""
                    }`}
                  onClick={() => setActiveType(type.key)}
                  type="button"
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.objectsGrid}>
            {currentObjects.map((obj, index) => (
              <div key={index} className={styles.objectItem}>
                <ObjectCard
                  image={obj.image}
                  title={obj.title}
                  onClick={() => openObjectModal(obj)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Object Fullscreen Modal */}
      <Modal
        isOpen={!!selectedObject}
        onClose={() => {
          setShowMobileProducts(false);
          setSelectedObject(null);
        }}
        variant="fullscreen"
        hideBackdrop
        contentClassName={styles.objectModalContentShell}
        closeButtonClassName={styles.objectModalCloseBtn}
        hideCloseButton={showMobileProducts}
      >
        {selectedObject && (
          <div className={styles.objectModalLayout}>
            {!showMobileProducts && (
              <>
                <div className={styles.objectModalGalleryCol}>
                  <h2 className={styles.objectModalMobileTitle}>{selectedObject.title}</h2>
                  {selectedObject.gallery.map((img, i) => (
                    <div className={styles.objectGalleryItem} key={i}>
                      <Image
                        src={img}
                        alt={`${selectedObject.title} ${i + 1}`}
                        fill
                        className={styles.objectGalleryImg}
                      />
                    </div>
                  ))}
                </div>

                <aside className={styles.objectModalProductsCol}>
                  <h2 className={styles.objectModalTitle}>{selectedObject.title}</h2>
                  <p className={styles.objectModalSubtitle}>
                    Продукты, которые использовались
                    <br />
                    на данном объекте:
                  </p>

                  <div className={styles.objectProductsList}>
                    {selectedObject.products.map((product, index) => (
                      <div className={styles.objectProductCard} key={`${product.slug}-${index}`}>
                        <div className={styles.objectProductImageWrap}>
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={120}
                            height={120}
                            className={styles.objectProductImage}
                          />
                        </div>
                        <div className={styles.objectProductInfo}>
                          <p className={styles.objectProductBrand}>
                            Бренд: <span>{product.brand}</span>
                          </p>
                          <p className={styles.objectProductTitle}>{product.title}</p>
                          <Link href={`/catalog/${product.slug}`} className={styles.objectProductBtn}>
                            {tc("more")}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>

                <div className={styles.objectModalMobileBottomBar}>
                  <button
                    type="button"
                    className={styles.objectModalMobileProductsBtn}
                    onClick={() => setShowMobileProducts(true)}
                  >
                    Используемые продукты
                  </button>
                </div>
              </>
            )}

            {showMobileProducts && (
              <div className={styles.mobileProductsView}>
                <div className={styles.mobileProductsHeader}>
                  <button
                    type="button"
                    className={styles.mobileProductsBackBtn}
                    onClick={() => setShowMobileProducts(false)}
                    aria-label="Back"
                  >
                    ←
                  </button>
                  <h3 className={styles.mobileProductsTitle}>Используемые продукты</h3>
                </div>

                <div className={styles.mobileProductsList}>
                  {selectedObject.products.map((product, index) => (
                    <article className={styles.mobileProductCard} key={`mobile-${product.slug}-${index}`}>
                      <div className={styles.mobileProductTop}>
                        <div className={styles.mobileProductImageWrap}>
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={96}
                            height={96}
                            className={styles.mobileProductImage}
                          />
                        </div>
                        <div className={styles.mobileProductInfo}>
                          <p className={styles.mobileProductBrand}>{product.brand}</p>
                          <p className={styles.mobileProductName}>{product.title}</p>
                        </div>
                      </div>
                      <Link href={`/catalog/${product.slug}`} className={styles.mobileProductBtn}>
                        Подробнее
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
