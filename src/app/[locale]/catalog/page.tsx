"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.css";

type CollapseIconProps = {
  isOpen: boolean;
  className?: string;
};

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
    slug: "knauf-rasler",
    image: "/images/products/knauf-rasler.png",
    brand: "Knauf",
    title: "Шпаклевка цементно-полимерная финишная",
  },
  {
    slug: "knauf-fugen-hydro",
    image: "/images/products/knauf-fugen-hydro-25kg.png",
    brand: "Knauf",
    title: "КНАУФ-Фуген Гидро шпаклевка гипсовая влагостойкая",
  },
  {
    slug: "knauf-polymer-finish",
    image: "/images/products/knauf-polymer-finish-10kg.png",
    brand: "Knauf",
    title: "КНАУФ-Полимер Финиш шпаклевка полимерная финишная",
  },
  {
    slug: "knauf-unihard",
    image: "/images/products/knauf-unihard-20kg.png",
    brand: "Knauf",
    title: "КНАУФ-Унихард шпаклевка гипсовая высокопрочная безусадочная",
  },
  {
    slug: "knauf-fugen-universal",
    image: "/images/products/knauf-fugen-universal-5kg.png",
    brand: "Knauf",
    title: "КНАУФ-Фуген шпаклевка гипсовая универсальная",
  },
  {
    slug: "knauf-rotband-finish",
    image: "/images/products/knauf-rotband-finish-25kg.png",
    brand: "Knauf",
    title: "КНАУФ-Ротбанд Финиш шпаклевка гипсовая финишная",
  },
  {
    slug: "knauf-hp-finish",
    image: "/images/products/knauf-hp-finish-25kg.png",
    brand: "Knauf",
    title: "Шпаклевка гипсовая Кнауф ХП Финиш",
  },
  {
    slug: "knauf-multi-finish",
    image: "/images/products/knauf-multi-finish-grey-25kg.png",
    brand: "Knauf",
    title: "Шпаклевка Кнауф Мульти-финиш",
  },
  {
    slug: "knauf-rotband-pasta-profi",
    image: "/images/products/knauf-rotband-pasta-profi.png",
    brand: "Knauf",
    title: "КНАУФ Ротбанд Паста Профи шпаклевка готовая",
  },
];

function CollapseIcon({ isOpen, className }: CollapseIconProps) {
  return (
    <span
      className={`${styles.collapseIcon} ${isOpen ? styles.collapseIconOpen : ""} ${className || ""}`.trim()}
      aria-hidden="true"
    >
      <svg className={`${styles.iconSvg} ${styles.iconPlus}`} viewBox="0 0 20 20" fill="none">
        <path d="M10 4V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <svg className={`${styles.iconSvg} ${styles.iconMinus}`} viewBox="0 0 20 20" fill="none">
        <path d="M4 10H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function CatalogPage() {
  const t = useTranslations("catalog");
  const tc = useTranslations("common");
  const [mobileProductView, setMobileProductView] = useState<"two" | "one">("two");
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Knauf");
  const [draftSelectedBrand, setDraftSelectedBrand] = useState<string | null>("Knauf");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>("putties");
  const [draftSelectedSubcategory, setDraftSelectedSubcategory] = useState<string | null>("putties");
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>("dryMixes");
  const [mobileFilterModal, setMobileFilterModal] = useState<"brands" | "categories" | "subcategories" | null>(null);
  const [openFilterBlocks, setOpenFilterBlocks] = useState({
    brands: true,
    categories: true,
  });
  const [openCategory, setOpenCategory] = useState<string | null>("dryMixes");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      key: "dryMixes",
      subcategories: [
        "cementSand",
        "putties",
        "floorLevelers",
        "plasters",
        "masonryMixes",
        "facadeMixes",
        "repairCompounds",
        "plasteringAccessories",
        "tilegrout",
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

  const toggleFilterBlock = (key: "brands" | "categories") => {
    setOpenFilterBlocks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const openBrandsModal = () => {
    setDraftSelectedBrand(selectedBrand);
    setMobileFilterModal("brands");
  };

  const applyBrandsFilter = () => {
    setSelectedBrand(draftSelectedBrand);
    setMobileFilterModal(null);
  };

  const resetBrandsFilter = () => {
    setDraftSelectedBrand(null);
  };

  const openSubcategoriesModal = (categoryKey: string) => {
    setActiveMobileCategory(categoryKey);
    setDraftSelectedSubcategory(selectedSubcategory);
    setMobileFilterModal("subcategories");
  };

  const applySubcategoryFilter = () => {
    setSelectedSubcategory(draftSelectedSubcategory);
    if (activeMobileCategory) {
      setOpenCategory(activeMobileCategory);
    }
    setMobileFilterModal(null);
  };

  const resetSubcategoryFilter = () => {
    setDraftSelectedSubcategory(null);
  };

  const activeCategoryData = categories.find((cat) => cat.key === activeMobileCategory);

  useEffect(() => {
    if (mobileFilterModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterModal]);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: tc("home"), href: "/" },
              { label: t("title") },
            ]}
          />

          <div className={styles.titlesRow}>
            <div className={styles.sidebarTitleWrap}>
              <h1 className={styles.pageTitle}>{t("title")}</h1>
            </div>
            <div className={styles.contentTitleWrap}>
              <h2 className={styles.categoryTitle}>{t("putties")}</h2>
            </div>
          </div>

          <div className={styles.catalogLayout}>
            <aside className={styles.sidebar}>
              <div className={styles.filterSection}>
                <button
                  type="button"
                  className={styles.filterTitleButton}
                  onClick={() => toggleFilterBlock("brands")}
                  aria-expanded={openFilterBlocks.brands}
                >
                  <span className="text-green">{t("brands")}</span>
                  <CollapseIcon isOpen={openFilterBlocks.brands} className={styles.filterToggle} />
                </button>
                {openFilterBlocks.brands && (
                  <ul className={styles.brandList}>
                    {brands.map((brand) => (
                      <li key={brand} className={styles.brandItem}>
                        <label className={styles.filterCheckboxLabel}>
                          <input
                            type="checkbox"
                            checked={selectedBrand === brand}
                            onChange={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                            className={styles.filterCheckboxInput}
                          />
                          <span className={styles.filterCheckboxVisual} aria-hidden="true" />
                          <span className={styles.filterCheckboxText}>{brand}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={styles.filterSection}>
                <button
                  type="button"
                  className={styles.filterTitleButton}
                  onClick={() => toggleFilterBlock("categories")}
                  aria-expanded={openFilterBlocks.categories}
                >
                  <span className="text-green">{t("categories")}</span>
                  <CollapseIcon isOpen={openFilterBlocks.categories} className={styles.filterToggle} />
                </button>
                {openFilterBlocks.categories && (
                  <ul className={styles.categoryList}>
                    {categories.map((cat) => (
                      <li key={cat.key} className={styles.categoryItem}>
                        <button className={styles.categoryBtn} onClick={() => toggleCategory(cat.key)}>
                          <span>{t(cat.key)}</span>
                          <CollapseIcon isOpen={openCategory === cat.key} className={styles.categoryToggle} />
                        </button>
                        {openCategory === cat.key && cat.subcategories.length > 0 && (
                          <ul className={styles.subcategoryList}>
                            {cat.subcategories.map((sub) => (
                              <li key={sub} className={styles.subcategoryItem}>
                                <label className={styles.filterCheckboxLabel}>
                                  <input
                                    type="checkbox"
                                    checked={selectedSubcategory === sub}
                                    onChange={() =>
                                      setSelectedSubcategory(selectedSubcategory === sub ? null : sub)
                                    }
                                    className={styles.filterCheckboxInput}
                                  />
                                  <span className={styles.filterCheckboxVisual} aria-hidden="true" />
                                  <span className={styles.filterCheckboxText}>{t(sub)}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>

            <div className={styles.content}>
              <div className={styles.mobileFilterButtons}>
                <button type="button" className={styles.mobileFilterBtn} onClick={openBrandsModal}>
                  {t("brands")}
                </button>
                <button
                  type="button"
                  className={styles.mobileFilterBtn}
                  onClick={() => {
                    setActiveMobileCategory(openCategory || "dryMixes");
                    setMobileFilterModal("categories");
                  }}
                >
                  {t("categories")}
                </button>
              </div>

              <div className={styles.searchBar}>
                <svg
                  className={styles.searchIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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

              <div className={styles.productsTopRow}>
                <h2 className={styles.mobileCategoryTitle}>{t("putties")}</h2>
                <div className={styles.mobileViewToggle}>
                  <button
                    type="button"
                    className={`${styles.viewToggleBtn} ${mobileProductView === "one" ? styles.viewToggleBtnActive : ""}`}
                    aria-label={tc("oneColumnView")}
                    onClick={() => setMobileProductView("one")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="5" y="5" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="5" y="10.5" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="5" y="16" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`${styles.viewToggleBtn} ${mobileProductView === "two" ? styles.viewToggleBtnActive : ""}`}
                    aria-label={tc("twoColumnView")}
                    onClick={() => setMobileProductView("two")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="5" y="5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="13" y="5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="5" y="13" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="13" y="13" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={`${styles.productsGrid} ${mobileProductView === "one" ? styles.productsGridOne : styles.productsGridTwo}`}>
                {products.map((product) => (
                  <div key={product.slug} className={styles.productGridItem}>
                    <ProductCard {...product} mobileView={mobileProductView} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobileFilterModal === "brands" && (
        <div className={styles.mobileModalOverlay}>
          <div className={styles.mobileModalHeader}>
            <h3 className={styles.mobileModalTitle}>{t("brands")}</h3>
            <button
              type="button"
              className={styles.mobileModalClose}
              aria-label={tc("close")}
              onClick={() => setMobileFilterModal(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className={styles.mobileModalBodyBrands}>
            <ul className={styles.mobileModalFilterList}>
              {brands.map((brand) => (
                <li key={brand} className={styles.mobileModalFilterItem}>
                  <label className={styles.filterCheckboxLabel}>
                    <input
                      type="checkbox"
                      checked={draftSelectedBrand === brand}
                      onChange={() => setDraftSelectedBrand(draftSelectedBrand === brand ? null : brand)}
                      className={styles.filterCheckboxInput}
                    />
                    <span className={styles.filterCheckboxVisual} aria-hidden="true" />
                    <span className={styles.filterCheckboxText}>{brand}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.mobileModalFooter}>
            <button type="button" className={styles.mobileModalApplyBtn} onClick={applyBrandsFilter}>
              {tc("apply")}
            </button>
            <button type="button" className={styles.mobileModalResetBtn} onClick={resetBrandsFilter}>
              {tc("reset")}
            </button>
          </div>
        </div>
      )}

      {mobileFilterModal === "categories" && (
        <div className={styles.mobileModalOverlay}>
          <div className={styles.mobileModalHeader}>
            <h3 className={styles.mobileModalTitle}>{t("categories")}</h3>
            <button
              type="button"
              className={styles.mobileModalClose}
              aria-label={tc("close")}
              onClick={() => setMobileFilterModal(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className={styles.mobileModalBodyCategories}>
            <ul className={styles.mobileCategoryList}>
              {categories.map((cat) => (
                <li key={cat.key} className={styles.mobileCategoryItem}>
                  <button
                    type="button"
                    className={styles.mobileCategoryBtn}
                    onClick={() => {
                      if (cat.subcategories.length > 0) {
                        openSubcategoriesModal(cat.key);
                      } else {
                        setOpenCategory(cat.key);
                        setMobileFilterModal(null);
                      }
                    }}
                  >
                    <span>{t(cat.key)}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {mobileFilterModal === "subcategories" && activeCategoryData && (
        <div className={styles.mobileModalOverlay}>
          <div className={styles.mobileModalHeader}>
            <button
              type="button"
              className={styles.mobileModalBack}
              aria-label={tc("close")}
              onClick={() => setMobileFilterModal("categories")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h3 className={styles.mobileModalTitleTruncated}>{t(activeCategoryData.key)}</h3>
          </div>

          <div className={styles.mobileModalBodySubcategories}>
            <ul className={styles.mobileModalFilterList}>
              {activeCategoryData.subcategories.map((sub) => (
                <li key={sub} className={styles.mobileModalFilterItem}>
                  <label className={styles.filterCheckboxLabel}>
                    <input
                      type="checkbox"
                      checked={draftSelectedSubcategory === sub}
                      onChange={() =>
                        setDraftSelectedSubcategory(draftSelectedSubcategory === sub ? null : sub)
                      }
                      className={styles.filterCheckboxInput}
                    />
                    <span className={styles.filterCheckboxVisual} aria-hidden="true" />
                    <span className={styles.filterCheckboxText}>{t(sub)}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.mobileModalFooter}>
            <button type="button" className={styles.mobileModalApplyBtn} onClick={applySubcategoryFilter}>
              {tc("apply")}
            </button>
            <button type="button" className={styles.mobileModalResetBtn} onClick={resetSubcategoryFilter}>
              {tc("reset")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
