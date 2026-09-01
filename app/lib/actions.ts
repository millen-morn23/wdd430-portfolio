"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProjectFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  technologies: z.string().min(2),
  type: z.enum(["opensource", "school"]),
});

function parseTechnologies(technologies: string): string {
  const technologyArray = technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  return `{${technologyArray
    .map((technology) =>
      `"${technology.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
    )
    .join(",")}}`;
}

export async function createProject(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const {
    title,
    description,
    technologies,
    type,
  } = parsed.data;

  const postgresArray = parseTechnologies(technologies);

  await sql`
    INSERT INTO projects (title, description, type, technologies)
    VALUES (
      ${title},
      ${description},
      ${type},
      ${postgresArray}::text[]
    )
  `;

  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(
  id: string,
  formData: FormData,
) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    technologies: formData.get("technologies"),
    type: formData.get("type"),
  };

  const parsed = ProjectFormSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid project input.");
  }

  const {
    title,
    description,
    technologies,
    type,
  } = parsed.data;

  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  const postgresArray = parseTechnologies(technologies);

  await sql`
    UPDATE projects
    SET
      title = ${title},
      description = ${description},
      type = ${type},
      technologies = ${postgresArray}::text[]
    WHERE id = ${projectId}
  `;

  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}/edit`);
  redirect("/projects");
}

export async function deleteProject(id: string) {
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new Error("Invalid project ID.");
  }

  await sql`
    DELETE FROM projects
    WHERE id = ${projectId}
  `;

  revalidatePath("/projects");
  redirect("/projects");
}