import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link?: string;
  yearCompleted: number;
}

interface ProjectRow {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school";
  technologies: string[];
  link: string | null;
  year_completed: number;
}

const ITEMS_PER_PAGE = 6;

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type,
    technologies: row.technologies,
    link: row.link ?? undefined,
    yearCompleted: row.year_completed,
  };
}

export async function getProjects(
  type?: string | null,
): Promise<Project[]> {
  if (type) {
    const { rows } = await sql<ProjectRow>`
      SELECT *
      FROM projects
      WHERE type = ${type}
      ORDER BY id
    `;

    return rows.map(mapProject);
  }

  const { rows } = await sql<ProjectRow>`
    SELECT *
    FROM projects
    ORDER BY id
  `;

  return rows.map(mapProject);
}

export async function getProjectById(
  id: number,
): Promise<Project | null> {
  const { rows } = await sql<ProjectRow>`
    SELECT *
    FROM projects
    WHERE id = ${id}
  `;

  return rows[0] ? mapProject(rows[0]) : null;
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number,
): Promise<Project[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchTerm = `%${query.trim()}%`;

  const { rows } = await sql<ProjectRow>`
    SELECT *
    FROM projects
    WHERE title ILIKE ${searchTerm}
       OR description ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1
         FROM unnest(technologies) AS technology
         WHERE technology ILIKE ${searchTerm}
       )
    ORDER BY id
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return rows.map(mapProject);
}

export async function fetchProjectsPages(
  query: string,
): Promise<number> {
  const searchTerm = `%${query.trim()}%`;

  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*)::text AS count
    FROM projects
    WHERE title ILIKE ${searchTerm}
       OR description ILIKE ${searchTerm}
       OR EXISTS (
         SELECT 1
         FROM unnest(technologies) AS technology
         WHERE technology ILIKE ${searchTerm}
       )
  `;

  const count = Number(rows[0]?.count ?? 0);

  return Math.ceil(count / ITEMS_PER_PAGE);
}