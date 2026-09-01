import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Projects
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          Explore my web and software development projects.
        </p>
      </section>

      <ProjectList projects={projects} />
    </main>
  );
}