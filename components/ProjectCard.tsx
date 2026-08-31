interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
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
    </article>
  );
}