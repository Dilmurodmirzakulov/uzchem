"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css";

const product = {
  brand: "Megamix",
  article: "0100006276",
  title: "Гипсовая шпаклевка Megamix Satin Gyps",
  description:
    "Megamix Satin Gyps — высококачественная гипсовая шпаклевка для внутренних работ, соответствующая ГОСТ 31387-2008. Обладает отличной адгезией, легко наносится и обеспечивает гладкую, не требующую грунтовки поверхность.",
  image: "/images/placeholder-product.svg",
  specs: [
    { key: "consumption", value: "1 кг/м² (слой 1 мм)" },
    { key: "adhesionStrength", value: "0,3 МПа" },
    { key: "compressiveStrength", value: "2,0 МПа" },
    { key: "settingTime", value: "180–200 минут" },
    { key: "workingTemperature", value: "+5°C…+35°C" },
  ],
};

const similarProducts = [
  { slug: "facade-megamix", image: "/images/placeholder-product.svg", brand: "Megamix", title: "Фасадная шпаклевка Megamix White Facade" },
  { slug: "profinish-megamix", image: "/images/placeholder-product.svg", brand: "Megamix", title: "Шпаклевка профессиональная Megamix PROFINISH" },
  { slug: "ready-facade-megamix", image: "/images/placeholder-product.svg", brand: "Megamix", title: "Готовая фасадная шпатлёвочная смесь Megamix" },
  { slug: "sati-megamix", image: "/images/placeholder-product.svg", brand: "Megamix", title: "Сухая строительная дисперсионная шпатлёвочная смесь Megamix" },
];

type TabType = "characteristics" | "description" | "calculator";

export default function ProductDetailPage() {
  const t = useTranslations("product");
  const tc = useTranslations("common");
  const tCatalog = useTranslations("catalog");
  const [activeTab, setActiveTab] = useState<TabType>("characteristics");

  const tabs: { key: TabType; label: string }[] = [
    { key: "characteristics", label: t("characteristics") },
    { key: "description", label: t("description") },
    { key: "calculator", label: t("calculator") },
  ];

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          { label: tc("home"), href: "/" },
          { label: tCatalog("dryMixes"), href: "/catalog" },
          { label: tCatalog("putties"), href: "/catalog" },
          { label: product.title },
        ]}
      />

      {/* Product Info */}
      <section className={styles.productSection}>
        <div className="row g-4">
          <div className="col-lg-5">
            <div className={styles.productImage}>
              <div className={styles.imagePlaceholder}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={400}
                  className={styles.image}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className={styles.productDetails}>
              <p className={styles.brand}>
                {tc("brand")}: <span className="text-green">{product.brand}</span>
              </p>
              <p className={styles.article}>{tc("article")}: {product.article}</p>
              <h1 className={styles.productTitle}>{product.title}</h1>
              <p className={styles.productDesc}>{product.description}</p>

              <div className={styles.quickSpecs}>
                <h4 className={styles.quickSpecsTitle}>{t("shortSpecs")}:</h4>
                <table className={styles.specsTable}>
                  <tbody>
                    {product.specs.map((spec) => (
                      <tr key={spec.key}>
                        <td className={styles.specKey}>{t(spec.key)}</td>
                        <td className={styles.specValue}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.contactBlock}>
                <div>
                  <p className={styles.contactLabel}>{t("contactManager")}</p>
                  <a href="tel:+998712310909" className={styles.contactPhone}>
                    +99871 231 09 09
                  </a>
                </div>
                <div className={styles.quickRequest}>
                  <span>{tc("quickRequest")}:</span>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.telegramBtn}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    {tc("write")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className={styles.tabsSection}>
        <div className={styles.tabsNav}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === "characteristics" && (
            <table className={styles.fullSpecsTable}>
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.key}>
                    <td className={styles.specKey}>{t(spec.key)}</td>
                    <td className={styles.specValue}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "description" && (
            <div className={styles.descriptionContent}>
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === "calculator" && (
            <div className={styles.calculatorContent}>
              <p className={styles.placeholderText}>{t("calculatorPlaceholder")}</p>
            </div>
          )}
        </div>
      </section>

      {/* Similar Products */}
      <section className={`section ${styles.similarSection}`}>
        <div className={styles.similarHeader}>
          <h2 className={styles.similarTitle}>{t("similarProducts")}</h2>
          <div className={styles.similarNav}>
            <button className={styles.navBtn} aria-label="Previous">&larr;</button>
            <button className={styles.navBtn} aria-label="Next">&rarr;</button>
          </div>
        </div>
        <div className="row g-4">
          {similarProducts.map((p) => (
            <div key={p.slug} className="col-lg-3 col-md-6">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
