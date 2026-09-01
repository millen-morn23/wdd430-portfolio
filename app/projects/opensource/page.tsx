import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export default async function OpenSourceProjectsPage() {
  const projects = await getProjects("opensource");

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Open Source Projects
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          Projects and contributions developed outside of coursework.
        </p>
      </section>

      <ProjectList projects={projects} />
    </main>
  );
}