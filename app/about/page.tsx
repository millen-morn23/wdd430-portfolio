import type { Metadata } from "next";
import SkillBadge from "@/components/SkillBadge";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Millen Morn and the web development technologies he is learning.",
};

const skills = ["Next.js", "React", "TypeScript", "Tailwind CSS"];

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <section>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          About Me
        </h1>

        <p className="text-lg leading-8 text-gray-700">
          I&apos;m a full-stack web development student learning how to build
          modern web applications with technologies like React, Next.js,
          TypeScript, and Tailwind CSS.
        </p>

        <p className="mt-4 text-lg leading-8 text-gray-700">
          This portfolio is part of my WDD 430 coursework and will continue
          to grow as I learn more about full-stack development.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Technologies I&apos;m Learning
        </h2>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      </section>
    </main>
  );
}
