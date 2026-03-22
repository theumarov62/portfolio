"use client";
import PageAbout from "./(public)/about/page";
import PageExperiences from "./(public)/experiences/page";
import PageProjects from "./(public)/projects/page";
import PageSkills from "./(public)/skills/page";
export default function Home() {
  return (
    <section>
      <PageAbout />
      <PageProjects />
      <PageSkills />
      <PageExperiences />
    </section>
  );
}
