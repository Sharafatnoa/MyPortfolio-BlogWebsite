"use client";

import { useEffect, useState } from "react";

const LINES = ["whoami", "cat tagline.txt", "./pipeline --watch", "git log --oneline -3"];

export function TerminalTyped() {
  const [typed, setTyped] = useState("whoami");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the media query once on mount
    setReduced(mq.matches);
    if (mq.matches) return;

    let li = 0;
    let ci = 1;
    let dir = 1;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = LINES[li];
      setTyped(full.slice(0, ci));
      let wait = dir > 0 ? 62 : 28;
      if (dir > 0 && ci >= full.length) {
        dir = -1;
        wait = 2200;
      } else if (dir < 0 && ci <= 0) {
        dir = 1;
        li = (li + 1) % LINES.length;
        wait = 380;
      }
      ci += dir;
      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="m-0 mb-[26px] font-mono text-[12.5px] text-ink2">
      <span className="text-tech">arefin@skovde</span>
      {":~$ "}
      {typed}
      {!reduced && (
        <span
          aria-hidden
          className="blink ml-[3px] inline-block h-[15px] w-[7px] align-[-2px]"
          style={{ background: "var(--tech)" }}
        />
      )}
    </p>
  );
}
