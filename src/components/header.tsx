"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";

const NAV: Array<{ label: string; href: string; id: string | null }> = [
  { label: "Home", href: "/", id: null },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Education", href: "/#education", id: "education" },
  { label: "Blog", href: "/#writing", id: "writing" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard hydration-safe mount flag
    setMounted(true);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the mobile sheet on route change
    setOpen(false);
  }, [pathname]);

  const handleNav = (e: MouseEvent, href: string, id: string | null) => {
    if (pathname !== "/") return;
    if (href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (id) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const themeLabel = mounted ? (theme === "dark" ? "light" : "dark") : "light";

  return (
    <header
      className="sticky top-0 z-20 border-b border-line"
      style={{
        background: "color-mix(in srgb, var(--bg) 74%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex max-w-[1020px] items-center gap-7 px-[28px] py-4">
        <Link
          href="/"
          onClick={(e) => handleNav(e, "/", null)}
          className="font-mono text-[13px] text-ink"
          style={{ letterSpacing: "-0.2px" }}
        >
          snarefin<span className="text-ink2">.me</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-[22px] sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNav(e, item.href, item.id)}
              className="nav-link text-sm text-ink2"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-line px-[11px] py-[5px] font-mono text-[11px] text-ink2 hover:border-ink hover:text-ink"
          >
            {themeLabel}
          </button>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex items-center gap-2 rounded-full border border-line px-3 py-[6px] font-mono text-[11px] text-ink2 sm:hidden"
        >
          menu
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-[28px] py-3 sm:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNav(e, item.href, item.id)}
                className="rounded px-2 py-2 text-sm text-ink2 hover:bg-soft hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-1 w-fit rounded-full border border-line px-[11px] py-[5px] font-mono text-[11px] text-ink2"
            >
              {themeLabel} mode
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
