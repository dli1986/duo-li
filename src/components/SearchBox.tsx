"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    PagefindUI?: new (options: { element: HTMLElement; showSubResults?: boolean }) => unknown;
  }
}

export function SearchBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;

    const container = containerRef.current;

    const cssHref = "/pagefind/pagefind-ui.css";
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssHref;
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = "/pagefind/pagefind-ui.js";
    script.onload = () => {
      if (window.PagefindUI) {
        new window.PagefindUI({ element: container, showSubResults: true });
      }
    };
    script.onerror = () => {
      container.innerHTML =
        '<p class="text-sm text-zinc-500">Search index not found yet. Run `npm run build` to generate it.</p>';
    };
    document.body.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}
