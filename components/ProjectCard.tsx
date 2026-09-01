import Link from "next/link";
import { deleteProject } from "@/app/lib/actions";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h2 className="mb-3 text-xl font-bold text-gray-900">{title}</h2>

      <p className="mb-4 text-gray-700">{description}</p>

      <p className="text-sm text-gray-600">
        <strong>Technologies:</strong> {technologies.join(", ")}
      </p>

      {link && (
        <p className="mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            View Project
          </a>
        </p>
      )}

      <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">
        <Link
          href={`/projects/${id}/edit`}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Edit
        </Link>

        <form action={deleteProject.bind(null, String(id))}>
          <button
            type="submit"
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}