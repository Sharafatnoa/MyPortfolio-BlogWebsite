import { TerminalTyped } from "@/components/terminal-typed";
import { PortraitCard } from "@/components/portrait-card";
import { NeuralNetCanvas } from "@/components/neural-net-canvas";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceTabs } from "@/components/experience-tabs";
import { EducationTimeline } from "@/components/education-timeline";
import { PostCard } from "@/components/post-card";
import { FeaturedProjectCard } from "@/components/project-card";
import { ContactForm } from "@/components/contact-form";
import { PROJECTS } from "@/content/data/projects";
import { getAllPosts } from "@/lib/posts";

const TAGS = ["data science", "MSc @ Skövde", "quality assurance · 5+ yrs", "web development", "AI Quality"];

export default function HomePage() {
  const posts = getAllPosts();
  const recent = posts.slice(0, 3);
  const featured = PROJECTS.slice(0, 3);

  return (
    <>
      <section className="grid grid-cols-1 items-start gap-[48px] py-[52px] max-[860px]:py-[44px] min-[861px]:grid-cols-[1.55fr_1fr] min-[861px]:py-[84px] min-[861px]:pb-[68px]">
        <div className="order-2 min-[861px]:order-1">
          <TerminalTyped />
          <h1
            className="m-0 text-[46px] font-semibold text-balance max-[640px]:text-[34px]"
            style={{ lineHeight: 1.08, letterSpacing: "-1.2px" }}
          >
            Shamsunnur Ibn Arefin
          </h1>
          <p className="m-0 mt-[14px] text-[19px] font-normal text-ink2">
            Data science student · former QA engineer
          </p>
          <p className="m-0 mt-[26px] max-w-[52ch] text-[17px] text-balance" style={{ lineHeight: 1.62 }}>
            Five years in software quality assurance, now studying data science at the University of
            Skövde. I work on coursework and personal projects in machine learning, and I am building
            my first production web project, streetdudes.se. Aiming to built my next phase of the
            career as a Data Scientist and AI Quality Engineer.
          </p>
          <div className="mt-[30px] flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-[5px] border border-line px-[10px] py-[6px] font-mono text-[11.5px] text-ink2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="order-1 mx-auto w-full max-w-[360px] min-[861px]:order-2 min-[861px]:max-w-none">
          <PortraitCard />
        </div>
      </section>

      <section className="py-1 pb-10">
        <div className="flex justify-between font-mono text-[10.5px] text-ink2 opacity-75">
          <span>forward pass</span>
          <span>4 · 5 · 4 · 2</span>
        </div>
        <NeuralNetCanvas />
      </section>

      <section className="pt-14 pb-5">
        <SectionHeading id="experience" title="experience" />
        <ExperienceTabs />
      </section>

      <section className="mt-10 pt-14 pb-5">
        <SectionHeading id="education" title="education" />
        <EducationTimeline />
      </section>

      <section className="mt-10 pt-14 pb-5">
        <SectionHeading id="writing" title="recent writing" linkHref="/blog" linkLabel="all posts →" />
        {recent.length > 0 ? (
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="m-0 text-sm text-ink2">Nothing published yet — check back soon.</p>
        )}
      </section>

      <section className="mt-14 pt-14 pb-5">
        <SectionHeading id="projects" title="selected projects" linkHref="/projects" linkLabel="all projects →" />
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {featured.map((project) => (
            <FeaturedProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-14 pt-14 pb-[96px]">
        <SectionHeading id="contact" title="contact" />
        <div className="grid grid-cols-1 items-start gap-[48px] min-[861px]:grid-cols-[1fr_1.25fr]">
          <div>
            <p className="m-0 mt-[14px] max-w-[34ch] text-[15px] text-ink2" style={{ lineHeight: 1.6 }}>
              Need help with something? I take on data science, testing, and web work, and I am open to
              consultation — from a quick second opinion on a dataset to building out a full project.
              Questions about something I wrote are welcome too. I usually reply within a few hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
