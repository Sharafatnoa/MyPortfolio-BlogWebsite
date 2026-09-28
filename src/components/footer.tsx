export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1020px] flex-wrap items-center justify-between gap-4 px-[28px] py-[22px] font-mono text-[11px] text-ink2">
        <span>snarefin.me</span>
        <span>MSc Data Science · University of Skövde</span>
        <div className="flex items-center gap-4">
          <a
            href="mailto:sharafatnoa@gmail.com"
            aria-label="Email"
            className="icon-link flex text-ink2"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="M3.5 6.5 12 13l8.5-6.5" />
            </svg>
          </a>
          <a
            href="https://github.com/Sharafatnoa"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="icon-link flex text-ink2"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/s-n-ibn-arefin-abb991123/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="icon-link flex text-ink2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
            </svg>
          </a>
        </div>
        <span>© 2026 Arefin</span>
      </div>
      <div className="mx-auto flex max-w-[1020px] flex-col items-center gap-1 px-[28px] pb-[26px] text-center font-mono text-[11px] text-ink2">
        <span>Designed and developed by Shamsunnur Ibn Arefin</span>
        <span>All rights reserved by Arefin.</span>
      </div>
    </footer>
  );
}
