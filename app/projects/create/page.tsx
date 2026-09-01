import Link from "next/link";
import { createProject } from "@/app/lib/actions";

export default function CreateProjectPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <section className="mb-8">
        <Link
          href="/projects"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
        >
          ← Back to projects
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
          Create Project
        </h1>

        <p className="mt-3 text-gray-600">
          Add a new project to your portfolio.
        </p>
      </section>

      <form
        action={createProject}
        className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Project title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={2}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            required
            minLength={10}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Project type
          </label>

          <select
            id="type"
            name="type"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
          >
            <option value="" disabled>
              Select a project type
            </option>
            <option value="school">School</option>
            <option value="opensource">Open Source</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="technologies"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Technologies
          </label>

          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            minLength={2}
            placeholder="Next.js, TypeScript, PostgreSQL"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
          />

          <p className="mt-2 text-sm text-gray-500">
            Enter technologies separated by commas.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700"
          >
            Save Project
          </button>

          <Link
            href="/projects"
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}