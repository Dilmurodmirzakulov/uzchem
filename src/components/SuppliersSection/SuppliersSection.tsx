"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal/Modal";
import styles from "./SuppliersSection.module.css";

interface Trademark {
  name: string;
  image: string;
  width: number;
  height: number;
  isFeatured?: boolean;
}

interface Supplier {
  name: string;
  description: string;
  products: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  about: string[];
  trademarks?: Trademark[];
  isFeatured?: boolean;
}

const suppliers: Supplier[] = [
  {
    name: "Profgips",
    description:
      "Profgips — ведущий производитель гипсовых строительных смесей. Продукция отличается высоким качеством и надёжностью.",
    products: ["Гипсовая штукатурка", "Шпаклевки", "Грунтовки"],
    image: "/images/suppliers/profigips.png",
    imageWidth: 140,
    imageHeight: 66,
    about: [
      "Компания Profgips специализируется на производстве гипсовых строительных материалов для внутренней отделки.",
      "Производственная база оснащена современным оборудованием, что обеспечивает стабильное качество продукции.",
    ],
    isFeatured: true,
  },
  {
    name: "Decorator",
    description:
      "Decorator — производитель декоративных покрытий и красок для внутренних и наружных работ.",
    products: ["Декоративные покрытия", "Краски", "Лаки"],
    image: "/images/suppliers/decorator.png",
    imageWidth: 140,
    imageHeight: 21,
    about: [
      "Decorator выпускает декоративные покрытия и интерьерные решения для частных и коммерческих объектов.",
      "Ассортимент включает фактурные материалы, краски и сопутствующие системы нанесения.",
    ],
  },
  {
    name: "Aspro",
    description:
      "Aspro — современный производитель строительных инструментов и малярных принадлежностей.",
    products: ["Шпатели", "Валики", "Кисти"],
    image: "/images/suppliers/aspro.png",
    imageWidth: 140,
    imageHeight: 22,
    about: [
      "Aspro производит малярные инструменты и комплектующие для профессионального применения.",
      "Продукция бренда ориентирована на стабильный результат и удобство использования на объекте.",
    ],
  },
  {
    name: "Alina",
    description: "Alina Paint — производитель лакокрасочной продукции с широкой цветовой палитрой.",
    products: ["Водоэмульсионные краски", "Эмали", "Грунтовки"],
    image: "/images/suppliers/logo1.png",
    imageWidth: 140,
    imageHeight: 47,
    about: [
      "Группа Компаний «Alina», основанная в 1989 году – многоотраслевой холдинг, занимающийся развитием различных отраслей бизнеса.",
      "В состав ГК «Alina» входят следующие самостоятельные направления бизнеса:",
      "Промышленная Группа «Alina» (Бренды «AlinEX», «Alina Paint», «Decorex», «НАШИ», «NORMA», «G-EX»);",
      "Сеть центров напольных покрытий «Домовой»;",
      "Электронный гипермаркет товаров для дома и сада «DOMSAD»;",
      "Первый казахстанский бренд экологичной бытовой химии «Doctor Green».",
    ],
    trademarks: [
      {
        name: "Alina Paint",
        image: "/images/suppliers/trademarks/alina-paint.png",
        width: 110,
        height: 35,
        isFeatured: true,
      },
      {
        name: "AlinEX",
        image: "/images/suppliers/trademarks/alinex.png",
        width: 110,
        height: 53,
      },
      {
        name: "Decorex",
        image: "/images/suppliers/trademarks/decorex.png",
        width: 110,
        height: 64,
      },
      {
        name: "Norma",
        image: "/images/suppliers/trademarks/norma.png",
        width: 110,
        height: 47,
      },
      {
        name: "Nashi",
        image: "/images/suppliers/trademarks/nashi.png",
        width: 110,
        height: 62,
      },
    ],
  },
  {
    name: "Caparol",
    description:
      "Caparol — немецкий бренд премиальных красок и фасадных систем с мировым именем.",
    products: ["Фасадные краски", "Системы утепления", "Грунтовки"],
    image: "/images/suppliers/caparol.png",
    imageWidth: 140,
    imageHeight: 98,
    about: [
      "Caparol — немецкий бренд премиальных фасадных и интерьерных красок с международной экспертизой.",
      "Решения бренда применяются как в частном строительстве, так и на крупных объектах.",
    ],
  },
  {
    name: "Norma",
    description: "Norma — надежный партнер в строительстве.",
    products: ["Строительные смеси", "Клеи"],
    image: "/images/suppliers/norma.png",
    imageWidth: 140,
    imageHeight: 60,
    about: [
      "Norma предлагает линейку строительных смесей и сопутствующей продукции для отделочных работ.",
      "Бренд ориентирован на практичность и стабильное качество на каждом этапе строительства.",
    ],
  },
  {
    name: "Alpina",
    description: "Alpina — краски для дома, создающие уют и комфорт.",
    products: ["Интерьерные краски", "Фасадные краски"],
    image: "/images/suppliers/alpina.png",
    imageWidth: 140,
    imageHeight: 70,
    about: [
      "Alpina создает современные краски и декоративные решения для жилых и коммерческих помещений.",
      "Продукция бренда сочетает широкую палитру оттенков и долговечность покрытий.",
    ],
  },
  {
    name: "Partner",
    description: "Один из ключевых поставщиков на рынке Узбекистана.",
    products: ["Химическая продукция"],
    image: "/images/suppliers/other1.png",
    imageWidth: 140,
    imageHeight: 37,
    about: [
      "Партнерская компания поставляет специализированную химическую продукцию для строительного сегмента.",
      "Поставки выполняются в соответствии с согласованными стандартами качества и сроками.",
    ],
  },
];

export default function SuppliersSection() {
  const t = useTranslations("home");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const sliderRef = useRef<HTMLDivElement>(null);
  const trademarksRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const scrollTrademarkLeft = () => {
    if (trademarksRef.current) {
      trademarksRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollTrademarkRight = () => {
    if (trademarksRef.current) {
      trademarksRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  const activeTrademarks: Trademark[] = selectedSupplier
    ? selectedSupplier.trademarks && selectedSupplier.trademarks.length > 0
      ? selectedSupplier.trademarks
      : [
        {
          name: selectedSupplier.name,
          image: selectedSupplier.image,
          width: 110,
          height: 60,
          isFeatured: true,
        },
      ]
    : [];

  return (
    <>
      <section className={styles.suppliers}>
        <div className="container">
          <div className={styles.suppliersHeader}>
            <h2 className={styles.sectionTitle}>{t("suppliersTitle")}</h2>
            <div className={styles.navigationButtons}>
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonPrev}`}
                onClick={scrollLeft}
                aria-label="Previous slide"
              >
                <Image
                  src="/images/suppliers/arrow-left.svg"
                  alt="Previous"
                  width={24}
                  height={24}
                />
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonNext}`}
                onClick={scrollRight}
                aria-label="Next slide"
              >
                <Image
                  src="/images/suppliers/arrow-left.svg"
                  alt="Next"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div className={styles.sliderViewport}>
            <div className={styles.sliderTrack} ref={sliderRef}>
              {suppliers.map((supplier, index) => (
                <div key={index} className={`${styles.supplierCard} ${supplier.isFeatured ? styles.featuredCard : ""}`}>
                  {supplier.isFeatured && (
                    <Image
                      src="/images/suppliers/profigips-bg.png"
                      alt=""
                      fill
                      className={styles.featuredBackground}
                      aria-hidden
                    />
                  )}

                  <div className={styles.logoWrapper}>
                    <Image
                      src={supplier.image}
                      alt={supplier.name}
                      width={supplier.imageWidth}
                      height={supplier.imageHeight}
                      className={styles.logoImage}
                    />
                  </div>

                  <button
                    type="button"
                    className={styles.plusButton}
                    aria-label={`Open ${supplier.name} details`}
                    onClick={() => setSelectedSupplier(supplier)}
                  >
                    <Image src="/images/suppliers/plus.png" alt="" width={16} height={16} aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Side Modal */}
      <Modal
        isOpen={!!selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
        variant="panel"
      >
        {selectedSupplier && (
          <div className={styles.modalContent}>
            <div className={styles.modalTop}>
              <div className={styles.modalLogo}>
                <Image
                  src={selectedSupplier.image}
                  alt={selectedSupplier.name}
                  width={240}
                  height={81}
                  className={styles.modalLogoImage}
                />
              </div>

              <h3 className={styles.modalSectionTitle}>О КОМПАНИИ</h3>

              <div className={styles.modalTextBlock}>
                {selectedSupplier.about.map((line, index) => (
                  <p key={index} className={styles.modalParagraph}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className={styles.tmSection}>
              <div className={styles.tmHeader}>
                <h4 className={styles.tmTitle}>ТМ</h4>
                <div className={styles.tmNavigation}>
                  <button
                    type="button"
                    className={`${styles.tmNavButton} ${styles.tmNavButtonPrev}`}
                    aria-label="Previous trademark"
                    onClick={scrollTrademarkLeft}
                  >
                    <Image src="/images/suppliers/arrow-left.svg" alt="" width={24} height={24} aria-hidden />
                  </button>
                  <button
                    type="button"
                    className={`${styles.tmNavButton} ${styles.tmNavButtonNext}`}
                    aria-label="Next trademark"
                    onClick={scrollTrademarkRight}
                  >
                    <Image src="/images/suppliers/arrow-left.svg" alt="" width={24} height={24} aria-hidden />
                  </button>
                </div>
              </div>

              <div className={styles.tmViewport}>
                <div className={styles.tmTrack} ref={trademarksRef}>
                  {activeTrademarks.map((trademark) => (
                    <div
                      key={trademark.name}
                      className={`${styles.tmCard} ${trademark.isFeatured ? styles.tmCardFeatured : ""}`}
                    >
                      {trademark.isFeatured && (
                        <Image
                          src="/images/suppliers/trademarks/featured-bg.png"
                          alt=""
                          fill
                          className={styles.tmFeaturedBackground}
                          aria-hidden
                        />
                      )}

                      <Image
                        src={trademark.image}
                        alt={trademark.name}
                        width={trademark.width}
                        height={trademark.height}
                        className={styles.tmLogo}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
