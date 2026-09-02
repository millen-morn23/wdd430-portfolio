import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import SchoolProjectList from "@/components/SchoolProjectList";

export const metadata: Metadata = {
  title: "School Projects",
  description:
    "Explore Millen Morn's web development projects completed as part of his studies.",
};

export default function SchoolProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          School Projects
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          Projects completed as part of my studies.
        </p>
      </section>

      <Suspense fallback={<ProjectCardSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}
