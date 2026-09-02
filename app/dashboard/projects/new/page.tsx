import Link from "next/link";
import CreateProjectForm from "@/app/projects/create/create-project-form";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <section className="mb-8">
        <Link
          href="/dashboard/projects"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
        >
          ← Back to Manage Projects
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
          Add Project
        </h1>

        <p className="mt-3 text-gray-600">
          Add a new project to your portfolio.
        </p>
      </section>

      <CreateProjectForm />
    </main>
  );
}
