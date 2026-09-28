"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const raf = requestAnimationFrame(() => scrollToId(id));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace("#", "");
      if (id) scrollToId(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
