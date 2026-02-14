"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css";

const brands = [
  "Semin",
  "Weber (Saint-Gobain)",
  "Ceresit (Henkel)",
  "Sheetrock (USG)",
  "Knauf",
  "Mapei",
  "Sika",
  "SiCaparolka",
  "Baumit",
  "Bergauf",
];

const products = [
  {
    slug: "shpaklevka-1",
    image: "/images/placeholder-product.svg",
    brand: "Knauf",
    title: "Шпаклевка цементно-полимерная финишная",
  },
  {
    slug: "shpaklevka-2",
    image: "/images/placeholder-product.svg",
    brand: "Knauf",
    title: "КНАУФ-Полимер Финиш шпаклевка полимерная финишная",
  },
  {
    slug: "shpaklevka-3",
    image: "/images/placeholder-product.svg",
    brand: "Knauf",
    title: "КНАУФ-Фуген шпаклевка гипсовая универсальная",
  },
  {
    slug: "shpaklevka-4",
    image: "/images/placeholder-product.svg",
    brand: "Knauf",
    title: "КНАУФ-Фуген Гидро шпаклевка гипсовая влагостойкая",
  },
  {
    slug: "shpaklevka-5",
    image: "/images/placeholder-product.svg",
    brand: "Knauf",
    title: "КНАУФ-Унихард шпаклевка гипсовая высокопрочная",
  },
  {
    slug: "shpaklevka-6",
    image: "/images/placeholder-product.svg",
    brand: "Knauf",
    title: "КНАУФ-Ротбанд Финиш шпаклевка гипсовая финишная",
  },
];

export default function CatalogPage() {
  const t = useTranslations("catalog");
  const tc = useTranslations("common");
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Knauf");
  const [openCategory, setOpenCategory] = useState<string | null>("dryMixes");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      key: "dryMixes",
      subcategories: [
        "cementSand", "putties", "floorLevelers", "plasters",
        "masonryMixes", "facadeMixes", "repairCompounds",
        "plasteringAccessories", "tilegrout",
      ],
    },
    { key: "cementBulk", subcategories: [] },
    { key: "waterproofing", subcategories: [] },
    { key: "wallFacade", subcategories: [] },
    { key: "drywallMaterials", subcategories: [] },
    { key: "constructionSupplies", subcategories: [] },
  ];

  const toggleCategory = (key: string) => {
    setOpenCategory(openCategory === key ? null : key);
  };

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          { label: tc("home"), href: "/" },
          { label: t("title") },
        ]}
      />

      <div className={styles.catalogLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>
              <span className="text-green">{t("brands")}</span>
              <button className={styles.filterToggle}>-</button>
            </h3>
            <ul className={styles.brandList}>
              {brands.map((brand) => (
                <li key={brand} className={styles.brandItem}>
                  <label className={styles.brandLabel}>
                    <input
                      type="checkbox"
                      checked={selectedBrand === brand}
                      onChange={() =>
                        setSelectedBrand(selectedBrand === brand ? null : brand)
                      }
                      className={styles.brandCheckbox}
                    />
                    <span>{brand}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>
              <span className="text-green">{t("categories")}</span>
            </h3>
            <ul className={styles.categoryList}>
              {categories.map((cat) => (
                <li key={cat.key} className={styles.categoryItem}>
                  <button
                    className={styles.categoryBtn}
                    onClick={() => toggleCategory(cat.key)}
                  >
                    <span>{t(cat.key)}</span>
                    <span className={styles.categoryToggle}>
                      {openCategory === cat.key ? "-" : "+"}
                    </span>
                  </button>
                  {openCategory === cat.key && cat.subcategories.length > 0 && (
                    <ul className={styles.subcategoryList}>
                      {cat.subcategories.map((sub) => (
                        <li key={sub} className={styles.subcategoryItem}>
                          <button className={styles.subcategoryBtn}>
                            {t(sub)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <h1 className={styles.pageTitle}>{t("title")}</h1>
            <h2 className={styles.categoryTitle}>{t("putties")}</h2>
          </div>

          <div className={styles.searchBar}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder={tc("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className="row g-4">
            {products.map((product) => (
              <div key={product.slug} className="col-lg-4 col-md-6">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
