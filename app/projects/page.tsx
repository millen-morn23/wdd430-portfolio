import Pagination from "@/components/Pagination";
import ProjectList from "@/components/ProjectList";
import ProjectSearch from "@/components/ProjectSearch";
import {
  fetchFilteredProjects,
  fetchProjectsPages,
} from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export default async function ProjectsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query?.trim() ?? "";
  const requestedPage = Number(searchParams?.page ?? "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

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

      <ProjectSearch />

      <ProjectList projects={projects} />

      <Pagination
        totalPages={totalPages}
        currentPage={safeCurrentPage}
      />
    </main>
  );
}