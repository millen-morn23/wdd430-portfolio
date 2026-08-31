import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "KilimoSync",
    description:
      "A farm-to-market mobile application designed to help farmers manage their products and connect more easily with buyers.",
    technologies: ["React Native", "JavaScript", "Mobile Development"],
    link: "https://github.com/millen-morn23/kilimosync",
  },
  {
    title: "Movie Discover Hub",
    description:
      "A web application that allows users to discover and explore movies through a simple and user-friendly interface.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://millen-morn23.github.io/movie-discover-hub/",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Millen&apos;s Portfolio
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
          Welcome to my portfolio. Here you can find some of the projects
          I&apos;ve worked on while developing my skills in web and software
          development.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          My Projects
        </h2>

        <ProjectList projects={projects} />
      </section>
    </main>
  );
}