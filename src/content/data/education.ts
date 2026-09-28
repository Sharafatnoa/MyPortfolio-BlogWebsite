import type { Study } from "./types";

export const STUDIES: Study[] = [
  {
    degree: "MSc in Data Science",
    school: "University of Skövde",
    dates: "Aug 2025 – Jun 2027 (expected)",
    place: "Skövde, Sweden · 120 credits",
    current: true,
    points: [
      "Master's thesis (30 credits) in spring 2027, topic open. Looking for applied machine learning on real device and sensor data.",
      "Data Science Project (15 credits): remaining useful life estimation with knowledge distillation on NASA CMAPSS.",
    ],
    courses: [
      "Artificial Intelligence",
      "Data Mining",
      "Introduction to Data Science",
      "Visual Data Analysis",
      "Big Data Programming",
      "Data Science Project",
    ],
  },
  {
    degree: "BSc in Computer Science & Engineering",
    school: "BAIUST",
    dates: "Graduated May 2019",
    place: "Bangladesh",
    current: false,
    points: ["Industrial training at an ISO 9001:2015 certified software company."],
    courses: [
      "Algorithms",
      "Data Structures",
      "OOP",
      "Databases",
      "Software Engineering",
      "Computer Networks",
      "Operating Systems",
    ],
  },
];
