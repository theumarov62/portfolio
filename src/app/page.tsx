"use client";
import PageAbout from "./(public)/about/page";
import PageExperiences from "./(public)/experiences/page";
import PageHome from "./(public)/home/page";
import PageProjects from "./(public)/projects/page";
import PageSkills from "./(public)/skills/page";
export default function Home() {
  return (
    <section>
      <PageHome />
      <PageAbout />
      <PageProjects />
      <PageSkills />
      <PageExperiences />
    </section>
  );
}
