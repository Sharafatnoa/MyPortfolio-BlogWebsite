import type { Job } from "./types";

export const JOBS: Job[] = [
  {
    short: "Streetdudes",
    role: "System developer & kitchen assistant",
    company: "Streetdudes AB",
    dates: "May 2026 – present",
    place: "Borås, Sweden · part-time",
    points: [
      "Working two roles at once: building the restaurant's systems as technical lead for web, and working shifts in the kitchen as an assistant cook.",
      "Designed and built streetdudes.se, a bilingual (Swedish/English) website and online ordering system with Next.js, TypeScript, Supabase and Vercel. Online ordering is being prepared for launch.",
      "Built the kitchen setup — a live order dashboard and receipt printing — plus an admin panel with sales analytics.",
    ],
  },
  {
    short: "ReliSource",
    role: "SQA engineer",
    company: "ReliSource Technologies",
    dates: "Sep 2020 – Dec 2025",
    place: "Dhaka, Bangladesh · remote from Aug 2025",
    points: [
      "Designed test strategies, test cases and traceability matrices for 30+ production releases of web, API and data-driven systems in Agile teams.",
      "Built and maintained Playwright and Selenium automation suites, reducing manual regression effort by about 40%.",
      "Validated APIs with Postman and ran SQL-based database integrity checks to ensure end-to-end data correctness.",
      "Mentored and onboarded junior QA engineers; led the quality process and tracked 500+ defects with clear severity analysis.",
    ],
  },
  {
    short: "A4Aero",
    role: "SQA engineer",
    company: "A4Aero Limited",
    dates: "Jan 2020 – Sep 2020",
    place: "Dhaka, Bangladesh",
    points: [
      "Wrote test cases from requirements and ran functional and regression testing for aviation booking and certification systems.",
      "Worked with cross-functional teams on critical releases; reported issues in Jira with clear reproduction steps.",
    ],
  },
];
