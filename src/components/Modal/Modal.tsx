"use client";

import { useEffect, useCallback, useState } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: "side" | "fullscreen" | "bottom" | "panel";
  hideBackdrop?: boolean;
  contentClassName?: string;
  closeButtonClassName?: string;
  hideCloseButton?: boolean;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  variant = "side",
  hideBackdrop = false,
  contentClassName,
  closeButtonClassName,
  hideCloseButton = false,
  children,
}: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let resetAnimatingTimer: ReturnType<typeof setTimeout> | undefined;
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;

    if (isOpen) {
      resetAnimatingTimer = setTimeout(() => {
        setAnimating(false);
      }, 0);
      openTimer = setTimeout(() => {
        setVisible(true);
      }, 0);
      document.body.style.overflow = "hidden";
    } else {
      resetAnimatingTimer = setTimeout(() => {
        setAnimating(false);
      }, 0);
      closeTimer = setTimeout(() => {
        setVisible(false);
      }, 350); // match CSS transition duration
      document.body.style.overflow = "";
    }

    return () => {
      if (resetAnimatingTimer) clearTimeout(resetAnimatingTimer);
      if (openTimer) clearTimeout(openTimer);
      if (closeTimer) clearTimeout(closeTimer);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!visible || !isOpen) return;

    let frame1 = 0;
    let frame2 = 0;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        setAnimating(true);
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [visible, isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  if (!visible) return null;

  const variantClass =
    variant === "fullscreen"
      ? styles.fullscreen
      : variant === "bottom"
        ? styles.bottom
        : variant === "panel"
          ? styles.panel
          : styles.side;

  const overlayClass = variant === "panel" ? styles.overlayPanel : "";
  const closeButtonClass =
    variant === "panel"
      ? styles.closeBtnPanel
      : variant === "bottom"
        ? styles.closeBtnBottom
        : "";

  return (
    <div
      className={`${styles.overlay} ${overlayClass} ${!hideBackdrop && animating ? styles.overlayVisible : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.modal} ${variantClass} ${animating ? styles.modalVisible : ""
          }`}
      >
        {!hideCloseButton && (
          <button
            className={`${styles.closeBtn} ${closeButtonClass} ${closeButtonClassName || ""}`.trim()}
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        <div className={`${styles.content} ${contentClassName || ""}`.trim()}>{children}</div>
      </div>
    </div>
  );
}
