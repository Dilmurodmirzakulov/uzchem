"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import styles from "./page.module.css";

const product = {
  brand: "Megamix",
  article: "01000006276",
  title: "Гипсовая шпаклевка Megamix Satin Gyps",
  description:
    "Megamix Satin Gyps — высококачественная гипсовая шпаклевка для внутренних работ, соответствующая ГОСТ 31387-2008. Обладает отличной адгезией, легко наносится и обеспечивает гладкую, не требующую грунтовки поверхность.",
  image: "/images/products/megamix-satin-gyps.png",
  specs: [
    { key: "consumption", value: "1 кг/м² (слой 1 мм)" },
    { key: "adhesionStrength", value: "0,3 МПа" },
    { key: "compressiveStrength", value: "2,0 МПа" },
    { key: "settingTime", value: "180–200 минут" },
    { key: "workingTemperature", value: "+5°C…+35°C" },
  ],
};

const similarProducts = [
  {
    slug: "facade-megamix",
    image: "/images/products/megamix-satin-gyps.png",
    brand: "Megamix",
    title: "Фасадная шпаклевка Megamix White Facade",
  },
  {
    slug: "profinish-megamix",
    image: "/images/products/megamix-satin-gyps.png",
    brand: "Megamix",
    title: "Шпаклевка профессиональная Megamix PROFINISH",
  },
  {
    slug: "ready-facade-megamix",
    image: "/images/products/megamix-satin-gyps.png",
    brand: "Megamix",
    title: "Готовая фасадная шпатлёвочная смесь Megamix, READY FACADE 041...",
  },
  {
    slug: "sati-megamix",
    image: "/images/products/megamix-satin-gyps.png",
    brand: "Megamix",
    title: "Сухая строительная дисперсионная шпатлевочная смесь Megamix, SATI...",
  },
];

const workTypeOptions = [
  "Для керамической плитки и бетона",
  "Декор",
  "Для выравнивая стен и потолков",
  "Для гипсокартонных листов(ГКЛ)",
  "Окрашивание интерьеров",
  "Для создания и выравнивая основания пола",
  "Для теплоизоляционных плит",
  "Для финишной отделки оштукатуренных стен и потолков",
  "Для керамической плитки и бетона",
  "Затирка для керамической плитки",
  "Декоративные штукатурки и краски",
  "Покрытие лаком",
  "Окрашивание систем отопления",
  "Окрашивание фасадов",
];

type TabType = "characteristics" | "description" | "calculator";

export default function ProductDetailPage() {
  const t = useTranslations("product");
  const tc = useTranslations("common");
  const tCatalog = useTranslations("catalog");
  const [activeTab, setActiveTab] = useState<TabType>("characteristics");
  const [layerCount, setLayerCount] = useState<1 | 2>(1);
  const [workType, setWorkType] = useState("");
  const [isWorkTypeOpen, setIsWorkTypeOpen] = useState(true);
  const [selectedWorkTypeIndex, setSelectedWorkTypeIndex] = useState<number | null>(null);
  const [similarSlide, setSimilarSlide] = useState(0);

  const maxSimilarSlide = Math.max(0, similarProducts.length - 2);

  const tabs: { key: TabType; label: string }[] = [
    { key: "characteristics", label: t("characteristics") },
    { key: "description", label: t("description") },
    { key: "calculator", label: t("calculator") },
  ];

  return (
    <div className="container">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>{tc("home")}</Link>
        <span className={styles.separator}>•</span>
        <Link href="/catalog" className={styles.breadcrumbLink}>{tCatalog("dryMixes")}</Link>
        <span className={styles.separator}>•</span>
        <Link href="/catalog" className={styles.breadcrumbLink}>{tCatalog("putties")}</Link>
        <span className={styles.separator}>•</span>
        <span className={styles.breadcrumbCurrent}>{product.title}</span>
      </nav>

      <section className={styles.topSection}>
        <div className={styles.imageFrame}>
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={580}
            className={styles.mainImage}
            priority
          />
        </div>

        <div className={styles.infoCol}>
          <p className={styles.brandLine}>
            {tc("brand")}: <span>{product.brand}</span>
          </p>
          <p className={styles.articleLine}>{tc("article")}: {product.article}</p>
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.productDescription}>{product.description}</p>

          <h3 className={styles.quickTitle}>{t("shortSpecs")}:</h3>
          <div className={styles.quickSpecs}>
            {product.specs.map((spec) => (
              <div className={styles.quickRow} key={spec.key}>
                <span className={styles.quickKey}>{t(spec.key)}</span>
                <span className={styles.quickValue}>{spec.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.contactBox}>
            <p className={styles.contactText}>{t("contactManager")}</p>
            <a href="tel:+998712310909" className={styles.phone}>
              <span>+99871</span> 231 09 09
            </a>
            <div className={styles.quickRequestRow}>
              <p className={styles.quickRequestLabel}>{tc("quickRequest")}</p>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.telegramBtn}
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18.6667 1L9.5 10.1667" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.6667 1L12.8333 17L9.5 10.1667L2.66667 6.83333L18.6667 1Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {tc("write")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tabsSection}>
        <div className={styles.tabsHeader}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "characteristics" && (
          <div className={styles.characteristicsTable}>
            {product.specs.map((spec) => (
              <div className={styles.charRow} key={spec.key}>
                <span className={styles.charKey}>{t(spec.key)}:</span>
                <span className={styles.charValue}>{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "description" && (
          <div className={styles.descriptionPane}>
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === "calculator" && (
          <div className={styles.calculatorPane}>
            <div className={styles.calcField}>
              <label htmlFor="workTypeTrigger">Тип работы</label>
              <div className={styles.workTypeDropdown}>
                <button
                  id="workTypeTrigger"
                  type="button"
                  aria-expanded={isWorkTypeOpen}
                  aria-controls="workTypeList"
                  className={styles.dropdownTrigger}
                  onClick={() => setIsWorkTypeOpen((prev) => !prev)}
                >
                  <span className={workType ? styles.dropdownValue : styles.dropdownPlaceholder}>
                    {workType || "Выберите"}
                  </span>
                  <span className={`${styles.dropdownChevron} ${isWorkTypeOpen ? styles.dropdownChevronOpen : ""}`}>
                    ›
                  </span>
                </button>

                {isWorkTypeOpen && (
                  <ul id="workTypeList" className={styles.dropdownList} role="listbox" aria-label="Тип работы">
                    {workTypeOptions.map((option, index) => (
                      <li key={`${option}-${index}`} className={styles.dropdownItem}>
                        <button
                          type="button"
                          className={`${styles.dropdownOption} ${selectedWorkTypeIndex === index ? styles.dropdownOptionAccent : ""}`}
                          onClick={() => {
                            setWorkType(option);
                            setSelectedWorkTypeIndex(index);
                            setIsWorkTypeOpen(false);
                          }}
                        >
                          <span className={styles.dropdownArrow}>›</span>
                          <span>{option}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className={styles.calcField}>
              <label htmlFor="perimeter">Периметр (м)</label>
              <input id="perimeter" className={styles.input} placeholder="Введите" type="text" />
            </div>

            <div className={styles.calcField}>
              <label htmlFor="height">Высота (м)</label>
              <input id="height" className={styles.input} placeholder="Введите" type="text" />
            </div>

            <div className={styles.calcField}>
              <label>Кол-во слоев</label>
              <div className={styles.layersSwitch}>
                <button
                  type="button"
                  className={`${styles.layerBtn} ${layerCount === 1 ? styles.layerBtnActive : ""}`}
                  onClick={() => setLayerCount(1)}
                >
                  1
                </button>
                <button
                  type="button"
                  className={`${styles.layerBtn} ${layerCount === 2 ? styles.layerBtnActive : ""}`}
                  onClick={() => setLayerCount(2)}
                >
                  2
                </button>
              </div>
            </div>

            <div className={styles.calcField}>
              <label htmlFor="area">Площадь (м²)</label>
              <input id="area" className={styles.input} placeholder="Введите" type="text" />
            </div>

            <div className={styles.calcField}>
              <label className={styles.hiddenLabel}>Рассчитать</label>
              <button type="button" className={styles.calculateBtn}>Рассчитать</button>
            </div>
          </div>
        )}
      </section>

      <section className={styles.similarSection}>
        <div className={styles.similarHead}>
          <h2>{t("similarProducts")}</h2>
          <div className={styles.arrows}>
            <button
              type="button"
              aria-label="Previous"
              className={styles.arrowBtn}
              disabled={similarSlide === 0}
              onClick={() => setSimilarSlide((prev) => Math.max(0, prev - 1))}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next"
              className={styles.arrowBtn}
              disabled={similarSlide >= maxSimilarSlide}
              onClick={() => setSimilarSlide((prev) => Math.min(maxSimilarSlide, prev + 1))}
            >
              →
            </button>
          </div>
        </div>

        <div className={styles.similarSliderViewport}>
          <div
            className={styles.similarSliderTrack}
            style={{ "--slide-offset": String(-similarSlide) } as { [key: string]: string }}
          >
            {similarProducts.map((item) => (
              <article key={item.slug} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  <Image src={item.image} alt={item.title} width={280} height={280} className={styles.cardImage} />
                </div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardBrand}>
                    <span className={styles.cardBrandLabel}>{tc("brand")}: </span>
                    <span>{item.brand}</span>
                  </p>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <Link href={`/catalog/${item.slug}`} className={styles.cardButton}>
                  {tc("more")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
