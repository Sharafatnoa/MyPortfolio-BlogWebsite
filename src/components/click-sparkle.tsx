"use client";

import { useEffect } from "react";

export function ClickSparkle() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest("a,button,input,textarea,select,label,canvas")) return;
      const tech = getComputedStyle(document.documentElement).getPropertyValue("--tech").trim() || "#39f";
      const el = document.createElement("div");
      el.style.cssText =
        "position:fixed;left:" +
        e.clientX +
        "px;top:" +
        e.clientY +
        "px;width:34px;height:34px;pointer-events:none;z-index:60;animation:om-flash 620ms ease-out forwards;background:radial-gradient(circle," +
        tech +
        " 0%,transparent 62%)";
      const bar =
        "position:absolute;left:50%;top:50%;background:linear-gradient(to right,transparent," +
        tech +
        ",transparent);transform:translate(-50%,-50%)";
      const h = document.createElement("div");
      h.style.cssText = bar + ";width:34px;height:1.5px";
      const v = document.createElement("div");
      v.style.cssText = bar + " rotate(90deg);width:34px;height:1.5px";
      el.appendChild(h);
      el.appendChild(v);
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 680);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
}
