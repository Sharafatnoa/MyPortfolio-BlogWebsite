import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/content/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Coursework from the MSc, personal data science projects, and the web project I am currently building.",
};

export default function ProjectsPage() {
  return (
    <section className="py-16 pb-[88px]">
      <SectionHeading as="h1" title="projects" ruleMaxWidth={360} />
      <p className="m-0 max-w-[56ch] text-base text-ink2" style={{ lineHeight: 1.6 }}>
        Coursework from the MSc, personal data science projects, and the web project I am currently
        building.
      </p>
      <div
        className="mt-[34px] grid gap-[22px]"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
