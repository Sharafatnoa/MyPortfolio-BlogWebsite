export interface Job {
  short: string;
  role: string;
  company: string;
  dates: string;
  place: string;
  points: string[];
}

export interface Study {
  degree: string;
  school: string;
  dates: string;
  place: string;
  current: boolean;
  points: string[];
  courses: string[];
}

export type ProjectKind = "web project" | "coursework" | "personal";

export interface Project {
  title: string;
  kind: ProjectKind;
  year: string;
  desc: string;
  stack: string[];
  meta: string;
  href: string;
}
