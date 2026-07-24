"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

type Props = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export default function MobileMenu({ open, onClose, pathname }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <nav
      id="mobile-menu"
      className={`mobile-nav container${open ? " open" : ""}`}
      hidden={!open}
      aria-label="Mobile"
    >
      {siteConfig.mainNav.map((item) => {
        const current =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            aria-current={current ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
