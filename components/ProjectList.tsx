import ProjectCard from "./ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <section
      className="grid gap-6 md:grid-cols-2"
      aria-label="Portfolio projects"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </section>
  );
}