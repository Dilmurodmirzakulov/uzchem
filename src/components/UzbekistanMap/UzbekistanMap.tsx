"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "./UzbekistanMap.module.css";
import {
  UZBEKISTAN_MAP_PATH_INDEX_TO_REGION_ID,
  UZBEKISTAN_REGIONS_SAMPLE,
  type UzbekistanRegionInfo,
} from "@/data/uzbekistanRegions.sample";

/**
 * Pre-process the raw SVG string:
 *  1. Add `.region` class + `data-region-index` to every path[stroke]
 *  2. Inject a <style> block inside the SVG for hover + selected visuals
 *
 * Because the styles live *inside* the SVG markup, they survive React
 * reconciliation and don't depend on imperative JS listeners.
 */
function prepareSvg(raw: string): string | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(raw, "image/svg+xml");
  const svgEl = doc.querySelector("svg");
  if (!svgEl) return null;

  /* Tag every region path */
  const paths = svgEl.querySelectorAll("path[stroke]");
  paths.forEach((p, i) => {
    p.classList.add("region");
    p.setAttribute("data-region-index", String(i));
  });

  /* Inject CSS-only hover & selected styles */
  const styleEl = doc.createElementNS("http://www.w3.org/2000/svg", "style");
  styleEl.textContent = `
    .region {
      cursor: pointer;
      transition: fill 0.2s ease, stroke 0.2s ease;
    }
    .region:hover {
      fill: #5fa536 !important;
      stroke: #72BE44 !important;
    }
    .region.selected {
      fill: #72BE44 !important;
      stroke: #72BE44 !important;
    }
    /* selected takes priority over hover */
    .region.selected:hover {
      fill: #72BE44 !important;
      stroke: #72BE44 !important;
    }
  `;
  svgEl.insertBefore(styleEl, svgEl.firstChild);

  return new XMLSerializer().serializeToString(svgEl);
}

export default function UzbekistanMap() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [selectedPathIndex, setSelectedPathIndex] = useState<number | null>(null);
  const [hoveredPathIndex, setHoveredPathIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const regionsById = useMemo(() => {
    const map = new Map<string, UzbekistanRegionInfo>();
    for (const region of UZBEKISTAN_REGIONS_SAMPLE) {
      map.set(region.id, region);
    }
    return map;
  }, []);

  const selectedRegionId =
    selectedPathIndex === null
      ? undefined
      : UZBEKISTAN_MAP_PATH_INDEX_TO_REGION_ID[selectedPathIndex];

  const selectedRegion = selectedRegionId
    ? regionsById.get(selectedRegionId)
    : undefined;

  const hoveredRegionId =
    hoveredPathIndex === null
      ? undefined
      : UZBEKISTAN_MAP_PATH_INDEX_TO_REGION_ID[hoveredPathIndex];

  const hoveredRegion = hoveredRegionId ? regionsById.get(hoveredRegionId) : undefined;

  /* ---- fetch + preprocess SVG (runs once) ---- */

  useEffect(() => {
    let cancelled = false;
    fetch("/images/uzbekistan-map.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load SVG");
        return res.text();
      })
      .then((raw) => {
        if (cancelled) return;
        const processed = prepareSvg(raw);
        setSvgMarkup(processed);
      })
      .catch(() => {
        if (!cancelled) setSvgMarkup(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- inject SVG into DOM once (avoids re-render wiping classes) ---- */

  useEffect(() => {
    if (!svgMarkup || !svgContainerRef.current) return;
    svgContainerRef.current.innerHTML = svgMarkup;
  }, [svgMarkup]);

  /* ---- toggle .selected class on the right path (synchronous) ---- */

  useLayoutEffect(() => {
    const svgEl = svgContainerRef.current?.querySelector("svg");
    if (!svgEl) return;

    const paths = svgEl.querySelectorAll<SVGPathElement>(".region");
    paths.forEach((p, i) => {
      p.classList.toggle("selected", i === selectedPathIndex);
    });
  }, [selectedPathIndex, svgMarkup]);

  /* ---- click handler (event delegation) ---- */

  const handleClick = (e: React.MouseEvent) => {
    const pathEl = (e.target as Element).closest(".region");
    if (!pathEl) return;

    const idx = Number(pathEl.getAttribute("data-region-index"));
    if (!Number.isFinite(idx) || idx < 0) return;

    setSelectedPathIndex(idx);
    setIsOpen(true);
  };

  /* ---- tooltip via mouse move (event delegation) ---- */

  const hoveredRef = useRef<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const pathEl = (e.target as Element).closest(".region");
    if (!pathEl) {
      if (hoveredRef.current !== null) {
        hoveredRef.current = null;
        setHoveredPathIndex(null);
        if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
      }
      return;
    }

    const idx = Number(pathEl.getAttribute("data-region-index"));
    if (!Number.isFinite(idx)) return;

    /* Only update React state when the region changes */
    if (hoveredRef.current !== idx) {
      hoveredRef.current = idx;
      setHoveredPathIndex(idx);
    }

    /* Move tooltip position directly via DOM to avoid re-renders */
    const bounds = hostRef.current?.getBoundingClientRect();
    if (bounds && tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX - bounds.left + 12}px`;
      tooltipRef.current.style.top = `${e.clientY - bounds.top + 12}px`;
      tooltipRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    hoveredRef.current = null;
    setHoveredPathIndex(null);
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = "0";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        ref={hostRef}
        className={styles.mapHost}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Uzbekistan regions map"
      >
        <div ref={svgContainerRef} />
        {!svgMarkup && (
          <div className={styles.fallback}>
            Add /public/images/uzbekistan-map.svg
          </div>
        )}

        <div
          ref={tooltipRef}
          className={styles.tooltip}
          style={{ left: 0, top: 0, opacity: 0 }}
          aria-hidden="true"
        >
          {hoveredPathIndex !== null
            ? hoveredRegion?.name ?? `Region #${hoveredPathIndex}`
            : ""}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedPathIndex(null);
        }}
        variant="bottom"
        hideBackdrop
        modalClassName={styles.regionDetailsModal}
      >
        {selectedRegion ? (
          <div className={styles.modalContent}>
            <div className={styles.left}>
              {selectedRegion.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedRegion.avatarUrl}
                  alt={selectedRegion.managerName}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatar} />
              )}

              <div className={styles.manager}>
                <div className={styles.managerName}>
                  {selectedRegion.managerName}
                </div>
                <div className={styles.phone}>{selectedRegion.phone}</div>
              </div>
            </div>

            <div className={styles.right}>
              <svg
                className={styles.pin}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <span>{selectedRegion.city}</span>
            </div>
          </div>
        ) : (
          <div>
            {selectedPathIndex === null
              ? "Select a region"
              : "No data for this region yet"}
          </div>
        )}
      </Modal>
    </div>
  );
}
