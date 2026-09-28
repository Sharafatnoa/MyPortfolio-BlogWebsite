import type { Metadata } from "next";
import { Public_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StarfieldCanvas } from "@/components/starfield-canvas";
import { ClickSparkle } from "@/components/click-sparkle";
import { HashScroll } from "@/components/hash-scroll";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://snarefin.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shamsunnur Ibn Arefin — data science",
    template: "%s — snarefin.me",
  },
  description:
    "Portfolio and blog of Shamsunnur Ibn Arefin, MSc Data Science student at the University of Skövde and former QA engineer. Notes on data science, system design, and life in Sweden.",
  openGraph: {
    title: "Shamsunnur Ibn Arefin — data science",
    description:
      "Portfolio and blog of Shamsunnur Ibn Arefin, MSc Data Science student at the University of Skövde and former QA engineer.",
    url: siteUrl,
    siteName: "snarefin.me",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamsunnur Ibn Arefin — data science",
    description:
      "Portfolio and blog of Shamsunnur Ibn Arefin, MSc Data Science student at the University of Skövde and former QA engineer.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${publicSans.variable} ${spaceMono.variable}`}>
      <body className="min-h-full">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <StarfieldCanvas />
          <ClickSparkle />
          <HashScroll />
          <div className="relative z-[1] flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-[1020px] flex-1 px-[28px]">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
