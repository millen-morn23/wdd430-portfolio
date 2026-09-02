import Link from "next/link";
import { auth } from "@/auth";
import { getProjects } from "@/lib/projects-db";
import { deleteProject } from "@/app/lib/actions";

export const dynamic = "force-dynamic";

export default async function DashboardProjectsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            Manage Projects
          </h1>

          <p className="mt-3 text-gray-600">
            Create, edit, and delete projects in your portfolio.
          </p>
        </div>

        <Link
          href="/dashboard/projects/new"
          className="rounded-lg bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white hover:bg-gray-700"
        >
          Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            No projects yet
          </h2>

          <p className="mt-2 text-gray-600">
            Add your first project to your portfolio.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {project.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {project.type === "school"
                      ? "School"
                      : "Open Source"}{" "}
                    · {project.yearCompleted}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/dashboard/projects/${project.id}/edit`}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Edit
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await deleteProject(String(project.id));
                  }}
                >
                  <button
                    type="submit"
                    className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </form>

                <Link
                  href={`/projects/${project.id}`}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  View
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
